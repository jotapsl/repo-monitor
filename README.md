## Repo Monitor

Repo Monitor is a React/Django application that tracks commits from repositories owned by the user. When logged in, a user can add a repository for tracking, when this happens, Repo Monitor saves the repository commits from the last 30 days and start tracking new commits so the user can see them on the list.

### Running the project
- Open a command line window and go to the project's directory.
- `pipenv install --dev`
- `npm install`
- `npm run start`
- Open another command line window and go to the project's directory.
- `pipenv shell`
- `python manage.py runserver`

### Acknowledgement
This project was made using [Django React Boilerplate](https://github.com/vintasoftware/django-react-boilerplate), by Vinta Software.
