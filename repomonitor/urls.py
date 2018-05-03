from django.conf import settings
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView

import django_js_reverse.views

from repomonitorapp.views import get_github_access_token

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),

    url(r'^api/githubaccesstoken/$', get_github_access_token, name='get_github_access_token'),

    url(r'^logincallback/$', TemplateView.as_view(template_name='repomonitorapp/itworks.html'), name='logincallback'),
    url(r'^landing/$', TemplateView.as_view(template_name='repomonitorapp/itworks.html'), name='landing'),
    url(r'^app/$', TemplateView.as_view(template_name='repomonitorapp/itworks.html'), name='app'),
    url(r'^$', TemplateView.as_view(template_name='repomonitorapp/itworks.html'), name='landing'),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
