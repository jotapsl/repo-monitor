from django.conf import settings
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView

import django_js_reverse.views

from repomonitorapp.views import app_login, app_logout, get_session

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),

    url(r'^api/login/$', app_login, name='login'),
    url(r'^api/logout/$', app_logout, name='logout'),
    url(r'^api/get_session/$', get_session, name='get_session'),

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
