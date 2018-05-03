from django.shortcuts import render  # noqa
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import requests

# Create your views here.
def get_github_access_token(req):
    code = req.GET.get('code')
    headers = {'Accept': 'application/json'}
    r = requests.post('https://github.com/login/oauth/access_token', headers = headers, data = {
        'client_id': settings.GITHUB_CLIENT_ID,
        'client_secret': settings.GITHUB_SECRET_ID,
        'code': code
    })

    print('====')
    print(r.json())
    print('====')

    return JsonResponse(r.json())