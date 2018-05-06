from __future__ import unicode_literals

from django.contrib.auth import get_user_model
from django.db import models, transaction  # noqa

class Repo(models.Model):
    github_id = models.IntegerField(unique=True)
    full_name = models.CharField(max_length=100)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    objects = models.Manager()


class CommitManager(models.Manager):
    @transaction.atomic    
    def save_commits(self, repo, commits):
        for commit in commits:
            new_commit = Commit(
                message=commit['commit']['message'],
                author=commit['author']['login'],
                repo=repo,
                timestamp=commit['commit']['author']['date']
            )

            new_commit.save()


class Commit(models.Model):
    message = models.CharField(max_length=250)
    author = models.CharField(max_length=250)
    repo = models.ForeignKey(Repo, on_delete=models.CASCADE)
    timestamp = models.DateTimeField()

    objects = CommitManager()
