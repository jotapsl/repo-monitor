from django.conf import settings

import datetime
import requests

class GithubService:
    @staticmethod
    def get_token(code):
        headers = {'Accept': 'application/json'}
        access_response = requests.post('https://github.com/login/oauth/access_token', headers=headers, data={
            'client_id': settings.GITHUB_CLIENT_ID,
            'client_secret': settings.GITHUB_SECRET_ID,
            'code': code
        })

        return access_response.json()

    @staticmethod
    def get_user_data(access_token):
        headers = {'Authorization': f'token {access_token}',
                   'Accept': 'application/vnd.github.v3+json'}
        response = requests.get(
            'https://api.github.com/user', headers=headers)

        return response

    @staticmethod
    def get_repo_if_owner(reponame, access_token):
        headers = {'Authorization': f'token {access_token}',
                   'Accept': 'application/vnd.github.v3+json'}

        url = 'https://api.github.com/user/repos'
        lastPage = False

        # Check all pages
        while not lastPage:
            response = requests.get(
                url, headers=headers, params={
                    'visibility': 'public',
                    'affiliation': 'owner'
                })

            for repo in response.json():
                if repo.get('full_name') == reponame:
                    return repo

            lastPage = response.links.get('next') == None
            if not lastPage:
                url = response.links['next']['url']

        return None

    @staticmethod
    def get_commits_from_repo(reponame, access_token):
        commit_since_isodate = (datetime.datetime.utcnow().replace(
            microsecond=0) - datetime.timedelta(days=30)).isoformat() + 'Z'

        headers = {'Authorization': f'token {access_token}',
                   'Accept': 'application/vnd.github.v3+json'}
        url = f'https://api.github.com/repos/{reponame}/commits'

        lastPage = False
        commits = []

        # Fetch all commits in the last 30 days
        while not lastPage:
            response = requests.get(
                url, headers=headers, params={
                    'since': commit_since_isodate
                })

            for commit in response.json():
                commit_json = {
                    'message': commit['commit']['message'],
                    'author': commit['author']['login'],
                    'timestamp': commit['commit']['author']['date']
                }
                commits.append(commit_json)

            lastPage = response.links.get('next') == None
            if not lastPage:
                url = response.links['next']['url']

        return commits
    
    @staticmethod
    def set_webhook_to_repo(reponame, token):
        headers = {'Authorization': f'token {token}'}

        requests.post(f'https://api.github.com/repos/{reponame}/hooks',
            headers=headers,
            json={
                'name': 'web',
                'active': True,
                'config': {
                    'url': 'https://repo-monitor.herokuapp.com/api/webhook/listener',
                    'content_type': 'json'
                }
            }
        )

