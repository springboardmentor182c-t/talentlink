from django.db import models

from django.conf import settings
from apps.proposals.models import ProjectProposal

User = settings.AUTH_USER_MODEL


class Conversation(models.Model):
    proposal = models.OneToOneField(ProjectProposal, on_delete=models.CASCADE, related_name='conversation')
    participants = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Conversation for Proposal #{self.proposal.id}"


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Message from {self.sender} at {self.created_at}"
