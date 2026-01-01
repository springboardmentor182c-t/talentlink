from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from .models import Project
from apps.freelancers.models import FreelancerProfile
from apps.proposals.models import ProjectProposal


class AnalyticsAPITest(TestCase):
    def setUp(self):
        self.client_api = APIClient()
        User = get_user_model()

        # users
        self.client_user = User.objects.create_user(username='client1', password='pass')
        self.freelancer1 = User.objects.create_user(username='freelancer1', password='pass')
        self.freelancer2 = User.objects.create_user(username='freelancer2', password='pass')

        # freelancer profiles with skills
        FreelancerProfile.objects.create(user=self.freelancer1, title='Dev', skills='Python, Django')
        FreelancerProfile.objects.create(user=self.freelancer2, title='Dev', skills='Python, React')

        # projects
        self.p1 = Project.objects.create(title='Project One', description='d', skills='Python')
        self.p2 = Project.objects.create(title='Project Two', description='d', skills='React')

        # proposals: two for p1, one for p2
        ProjectProposal.objects.create(freelancer=self.freelancer1, client=self.client_user, project_id=self.p1.id, bid_amount=50)
        ProjectProposal.objects.create(freelancer=self.freelancer2, client=self.client_user, project_id=self.p1.id, bid_amount=60)
        ProjectProposal.objects.create(freelancer=self.freelancer1, client=self.client_user, project_id=self.p2.id, bid_amount=70)

    def test_proposals_per_project(self):
        resp = self.client_api.get('/api/projects/analytics/proposals-per-project/')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        counts = {item['project_id']: item['proposal_count'] for item in data}
        self.assertEqual(counts.get(self.p1.id), 2)
        self.assertEqual(counts.get(self.p2.id), 1)

    def test_freelancers_per_skill(self):
        resp = self.client_api.get('/api/projects/analytics/freelancers-per-skill/')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        mapping = {item['skill'].lower(): item['freelancer_count'] for item in data}
        self.assertEqual(mapping.get('python'), 2)
        self.assertEqual(mapping.get('django'), 1)
        self.assertEqual(mapping.get('react'), 1)

    def test_project_activity(self):
        resp = self.client_api.get(f'/api/projects/analytics/project-activity/?project_id={self.p1.id}')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data.get('project_id'), self.p1.id)
        timeline = data.get('timeline', [])
        total = sum(item['proposal_count'] for item in timeline)
        self.assertEqual(total, 2)
