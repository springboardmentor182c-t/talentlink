from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()


class ProfileMeEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_unauthenticated_returns_404(self):
        resp = self.client.get('/api/profile/me/')
        self.assertEqual(resp.status_code, 404)

    def test_options_shows_allowed_methods(self):
        resp = self.client.options('/api/profile/me/')
        allow = resp._headers.get('allow', resp.headers.get('Allow'))
        if allow is None:
            allow = resp.headers.get('Allow', '')
        print('DEBUG: OPTIONS allow header:', allow)

    def test_post_unauthenticated_returns_401(self):
        resp = self.client.post('/api/profile/me/', {}, format='json')
        if resp.status_code != 401:
            print('DEBUG: unauthenticated POST response:', resp.status_code)
        self.assertEqual(resp.status_code, 401)

    def test_get_authenticated_no_profile_returns_404(self):
        user = User.objects.create_user(username='u1', password='pass', user_type='freelancer')
        self.client.force_authenticate(user=user)
        resp = self.client.get('/api/profile/me/')
        self.assertEqual(resp.status_code, 404)

    def test_post_authenticated_creates_freelancer_profile(self):
        user = User.objects.create_user(username='u2', password='pass', user_type='freelancer')
        self.client.force_authenticate(user=user)
        data = {'first_name': 'John', 'last_name': 'Doe', 'title': 'Dev'}
        resp = self.client.post('/api/profile/me/', data, format='json')
        self.assertIn(resp.status_code, (200, 201))
        self.assertEqual(resp.data.get('first_name'), 'John')

    def test_post_authenticated_creates_client_profile(self):
        user = User.objects.create_user(username='u3', password='pass', user_type='client')
        self.client.force_authenticate(user=user)
        data = {'first_name': 'Jane', 'last_name': 'Smith', 'company_name': 'Acme'}
        resp = self.client.post('/api/profile/me/', data, format='json')
        self.assertIn(resp.status_code, (200, 201))
        self.assertEqual(resp.data.get('first_name'), 'Jane')
