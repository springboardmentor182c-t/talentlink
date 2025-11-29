from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class ProjectProposal(models.Model):
    STATUS_CHOICES = [
        ("submitted", "Submitted"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    freelancer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submitted_proposals")
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_proposals")
    project_title = models.CharField(max_length=255)
    description = models.TextField()
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="submitted")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.freelancer} → {self.project_title} ({self.status})"