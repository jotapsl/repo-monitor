from .models import User

class AuthBackend:
    def authenticate(self, request, github_id=None, username=None):
        try:
            user = User.objects.get_by_natural_key(github_id)
        except User.DoesNotExist: # pylint: disable=E1101
            user = User.objects.create_user(github_id=github_id, username=username)

        return user
    
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist: # pylint: disable=E1101
            return None
