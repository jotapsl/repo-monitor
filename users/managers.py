from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, github_id, username, password=None, **kwargs):
        user = self.model(github_id=github_id, username=username, **kwargs)
        user.save(using=self._db)
        return user

    def create_superuser(self, **kwargs):
        user = self.create_user(**kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
