import os
import django
import time
os.environ.setdefault('DJANGO_SETTINGS_MODULE','server.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()

email = 'smokeclient@example.com'
password = 'pass1234'

user, created = User.objects.get_or_create(email=email)
if created:
    user.set_password(password)
    user.is_active = True
    user.save()
    print('Created user', email)
else:
    user.set_password(password)
    user.is_active = True
    user.save()
    print('Ensured user exists', email)

# wait a moment for server to be ready
import requests
BASE = 'http://127.0.0.1:8000'

# Obtain JWT token
r = requests.post(BASE + '/api/users/login/', json={'email': email, 'password': password})
print('login status', r.status_code, r.text)
if r.status_code != 200:
    raise SystemExit('Login failed')
access = r.json().get('access')
headers = {'Authorization': f'Bearer {access}'}

# Create a project
proj_data = {
    'title': 'Smoke Test Project',
    'description': 'Created by smoke test',
    'skills': ['react','ui/ux'],
    'budget_min': 100,
    'budget_max': 500,
    'duration_days': 7,
    'status': 'open'
}
cp = requests.post(BASE + '/api/projects/projects/', json=proj_data, headers=headers)
print('create project:', cp.status_code, cp.text)
if cp.status_code not in (200,201):
    raise SystemExit('Create project failed')
pid = cp.json().get('id')

# Search projects
sr = requests.get(BASE + '/api/projects/projects/search/?skill=react&min_budget=50', headers=headers)
print('search status', sr.status_code, sr.text[:400])

# Save project
sv = requests.post(BASE + '/api/projects/saved/', json={'project': pid}, headers=headers)
print('save status', sv.status_code, sv.text)

print('Smoke test finished')
