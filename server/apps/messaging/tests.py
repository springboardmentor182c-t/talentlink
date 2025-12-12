from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from apps.proposals.models import ProjectProposal
from apps.messaging.models import Conversation, Message


User = get_user_model()


class MessagingAPITestCase(APITestCase):

    def setUp(self):
        self.client_user = User.objects.create_user(username='client', password='pass')
        self.freelancer_user = User.objects.create_user(username='freelancer', password='pass')
        self.other_user = User.objects.create_user(username='other', password='pass')

        self.proposal = ProjectProposal.objects.create(
            freelancer=self.freelancer_user,
            client=self.client_user,
            project_id=1,
            bid_amount=100.00,
            cover_letter='Test',
            status='submitted'
        )

        self.convo = Conversation.objects.get(proposal=self.proposal)

    def test_signal_created_conversation_and_participants(self):
        self.assertIsNotNone(self.convo)
        participants = list(self.convo.participants.all())
        self.assertIn(self.client_user, participants)
        self.assertIn(self.freelancer_user, participants)

    def test_conversation_list_filters_by_participant(self):
        client = APIClient()
        client.login(username='client', password='pass')

        url = reverse('messaging-conversations')
        resp = client.get(url)
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertTrue(any(c['id'] == self.convo.id for c in data))

    def test_client_can_send_when_submitted(self):
        c = APIClient()
        c.login(username='client', password='pass')

        url = reverse('messaging-messages', kwargs={'conversation_id': self.convo.id})
        resp = c.post(url, {'text': 'Hello from client'})
        self.assertEqual(resp.status_code, 201)
        msg = Message.objects.filter(conversation=self.convo).last()
        self.assertEqual(msg.sender, self.client_user)

    def test_client_cannot_send_when_not_allowed(self):
        self.proposal.status = 'considering'
        self.proposal.save()

        c = APIClient()
        c.login(username='client', password='pass')
        url = reverse('messaging-messages', kwargs={'conversation_id': self.convo.id})
        resp = c.post(url, {'text': 'Hello'})
        self.assertEqual(resp.status_code, 403)

    def test_freelancer_can_only_send_when_accepted(self):
        f = APIClient()
        f.login(username='freelancer', password='pass')
        url = reverse('messaging-messages', kwargs={'conversation_id': self.convo.id})
        resp = f.post(url, {'text': 'Freelancer here'})
        self.assertEqual(resp.status_code, 403)
        
        self.proposal.status = 'accepted'
        self.proposal.save()

        resp = f.post(url, {'text': 'Now accepted'})
        self.assertEqual(resp.status_code, 201)
        msg = Message.objects.filter(conversation=self.convo).last()
        self.assertEqual(msg.sender, self.freelancer_user)
