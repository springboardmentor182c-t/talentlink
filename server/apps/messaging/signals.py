from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Conversation
from apps.proposals.models import ProjectProposal


@receiver(post_save, sender=ProjectProposal)
def create_conversation(sender, instance, created, **kwargs):
    if created:
        convo = Conversation.objects.create(proposal=instance)
        participants = []
        if getattr(instance, 'client', None):
            participants.append(instance.client)
        if getattr(instance, 'freelancer', None):
            participants.append(instance.freelancer)

        if participants:
            convo.participants.set(participants)
        else:
            pass
