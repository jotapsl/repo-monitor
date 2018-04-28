web: gunicorn repomonitor.wsgi --limit-request-line 8188 --log-file -
worker: celery worker --app=repomonitor --loglevel=info
