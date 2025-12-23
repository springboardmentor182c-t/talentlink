from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.projects.models import Project
from apps.proposals.models import ProjectProposal
from .models import Notification
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

User = get_user_model()

def send_important_email(user, subject, message):
    if user.email:
        send_mail(
            subject,
            message,
            None,  # Use DEFAULT_FROM_EMAIL
            [user.email],
            fail_silently=True,
        )

@receiver(post_save, sender=Project)
def notify_project_activity(sender, instance, created, **kwargs):
    if created:
        # Notify client (project creator)
        if hasattr(instance, 'client') and instance.client:
            Notification.objects.create(
                recipient=instance.client,
                message=f"Your project '{instance.title}' was created.",
                project=instance
            )
            # Email notification (important)
            send_important_email(
                instance.client,
                "Project Created",
                f"Your project '{instance.title}' was created on TalentLink."
            )
    else:
        # Notify all freelancers with proposals on this project
        proposals = ProjectProposal.objects.filter(project_id=instance.id)
        for proposal in proposals:
            if proposal.freelancer:
                Notification.objects.create(
                    recipient=proposal.freelancer,
                    message=f"Project '{instance.title}' was updated.",
                    project=instance
                )
                # Email notification (important)
                send_important_email(
                    proposal.freelancer,
                    "Project Updated",
                    f"A project you proposed to ('{instance.title}') was updated."
                )

@receiver(post_save, sender=ProjectProposal)
def notify_proposal_activity(sender, instance, created, **kwargs):
    if created:
        # Notify client
        if instance.client:
            Notification.objects.create(
                recipient=instance.client,
                message=f"New proposal submitted by {instance.freelancer} for your project.",
                proposal=instance
            )
            # Email notification (important)
            send_important_email(
                instance.client,
                "New Proposal Received",
                f"You received a new proposal from {instance.freelancer} for your project."
            )
    else:
        # Notify freelancer on status change
        Notification.objects.create(
            recipient=instance.freelancer,
            message=f"Your proposal status changed to '{instance.status}'.",
            proposal=instance
        )
        # Email notification (important)
        send_important_email(
            instance.freelancer,
            "Proposal Status Updated",
            f"Your proposal status changed to '{instance.status}'."
        )
