from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Proposal(models.Model):
    client = models.ForeignKey(User, related_name='client_proposals', on_delete=models.CASCADE)
    freelancer = models.ForeignKey(User, related_name='freelancer_proposals', on_delete=models.CASCADE)

    STATUS_CHOICES = (
        ('sent', 'Sent'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='sent')
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Proposal #{self.id} ({self.client} → {self.freelancer})"


class Conversation(models.Model):
    proposal = models.OneToOneField(Proposal, on_delete=models.CASCADE, related_name='conversation')
    participants = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Conversation for Proposal #{self.proposal.id}"


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_at']