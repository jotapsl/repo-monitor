from django.shortcuts import render  # noqa
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .services import GithubService
from .models import Repo, Commit

import json
import requests
import re


class LoginView(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        username = request.user.username
        return JsonResponse({'username': username})

    def post(self, request, *args, **kwargs):
        # Get Access Token from OAuth
        code = json.loads(request.body).get('code')
        response_json = GithubService.get_token(code)

        # Check for errors
        if 'error' in response_json:
            return HttpResponse(status=401)

        # Get logged user info
        access_token = response_json.get('access_token')
        user_response = GithubService.get_user_data(access_token)

        # Check for errors
        if not user_response.ok:
            return HttpResponse(status=401)

        user_response_json = user_response.json()
        user_github_id = user_response_json.get('id')
        username = user_response_json.get('login')

        # Create Django session
        user = authenticate(
            request, github_id=user_github_id, username=username)
        login(request, user)
        request.session['access_token'] = access_token

        # Return relevant information to front end
        res = JsonResponse({'username': user.username})
        res.set_cookie('hassession', 'true',
                       max_age=settings.SESSION_COOKIE_AGE)
        return res


class LogoutView(View):
    def post(self, request, *args, **kwargs):
        del request.session['access_token']
        logout(request)

        res = HttpResponse()
        res.delete_cookie('hassession')
        return res


class CommitView(View):
    # List commits
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        reponame = request.GET.get('reponame')
        page = request.GET.get('page')

        # Filter by reponame
        if reponame:
            query = Commit.objects.filter(repo__full_name=reponame).order_by('-timestamp')
        else:
            query = Commit.objects.order_by('-timestamp')    
        commits = query.values('id','message','author','repo__full_name','timestamp')

        # Paginate
        paginator = Paginator(commits, 10)
        try:
            commits_page = paginator.page(page)
        except EmptyPage:
            commits_page = paginator.page(1)

        return JsonResponse({
            'list': list(commits_page.object_list),
            'page': commits_page.number,
            'hasNext': commits_page.has_next(),
            'hasPrev': commits_page.has_previous()
        }, safe=False)


class RepoView(View):
    # Add repo
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        token = request.session['access_token']

        reponame = json.loads(request.body).get('reponame')

        # Check if reponame parameter is valid
        if not re.match(r'^([a-zA-z0-9.-])+\/([a-zA-z0-9.-])+$', reponame):
            return JsonResponse(
                {'error': f'Invalid repository name.'}, status=400)

        # Check if repo is already added
        has_repo = Repo.objects.filter(full_name=reponame).exists()
        if has_repo:
            return JsonResponse(
                {'error': f'Repo named "{reponame}" already added into database.'}, status=400)

        repo = GithubService.get_repo_if_owner(
            reponame, token)

        # Check if user is owner of repo
        if not repo:
            return JsonResponse(
                {'error': f'User does not own any public repo named "{reponame}".'}, status=400)

        commits = GithubService.get_commits_from_repo(
            repo.get('full_name'), token)

        # Save Repo
        repo_obj = Repo(
            github_id=repo.get('id'),
            full_name=repo.get('full_name'),
            user=request.user
        )
        repo_obj.save()

        # Save Commits
        Commit.objects.save_commits(repo_obj, commits)

        return JsonResponse({'message': 'Repository successfully added.'})
