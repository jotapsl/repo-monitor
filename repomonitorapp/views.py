from django.shortcuts import render  # noqa
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.views import View

import json
import requests

class LoginView(View):
    def get(self, request, *args, **kwargs):
        if (not request.user.is_authenticated):
            return HttpResponse(status=401)
        
        username = request.user.username
        return JsonResponse({'username': username})
        
    def post(self, request, *args, **kwargs):
        # Get Access Token from OAuth
        code = json.loads(request.body).get('code')
        headers = {'Accept': 'application/json'}
        access_response = requests.post('https://github.com/login/oauth/access_token', headers = headers, data = {
            'client_id': settings.GITHUB_CLIENT_ID,
            'client_secret': settings.GITHUB_SECRET_ID,
            'code': code
        })

        response_json = access_response.json()

        # Check for errors
        if ('error' in response_json):
            return HttpResponse(status=401)

        # Get logged user info
        access_token = response_json.get('access_token')
        headers = {'Authorization': f'token {access_token}', 'Accept': 'application/vnd.github.v3+json'}
        user_response = requests.get('https://api.github.com/user', headers = headers)

        # Check for errors
        if (not user_response.ok):
            return HttpResponse(status=401)

        user_response_json = user_response.json()
        user_github_id = user_response_json.get('id')
        username = user_response_json.get('login')

        user = authenticate(request, github_id=user_github_id, username=username)
        login(request, user)

        request.session['access_token'] = access_token

        # Return relevant information to front end
        res = JsonResponse({'username': user.username})
        res.set_cookie('hassession', 'true', max_age=settings.SESSION_COOKIE_AGE)
        return res

class LogoutView(View):
    def post(self, request, *args, **kwargs):
        del request.session['access_token']
        logout(request)

        res = HttpResponse()
        res.delete_cookie('hassession')
        return res