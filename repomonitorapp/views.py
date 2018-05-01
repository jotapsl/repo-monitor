from django.shortcuts import render  # noqa
from django.http import HttpResponse
from django.conf import settings


# Create your views here.
def teste(req):
    print(settings.GITHUB_CLIENT_ID)
    print(settings.GITHUB_SECRET_ID)
    return HttpResponse('OK')