 Group-C-feature/projectproposal-Ambika-clean




 main-group-C
from django.db import models
from django.conf import settings
from apps.projects.models import Project

 Group-C-feature/projectproposal-Ambika-clean
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

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('sent', 'Sent'),
    ('accepted', 'Accepted'),
    ('rejected', 'Rejected'),
]


class Proposal(models.Model):
    # --- Link to Project ---
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='proposals'
    )

    # --- Link to Freelancer (User) ---
    freelancer = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="assigned_projects"
)

    # --- Proposal Details ---
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    cover_letter = models.TextField(blank=True, null=True)
    estimated_days = models.IntegerField(default=7)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
 main-group-C
    created_at = models.DateTimeField(auto_now_add=True)

    # ------------------------------------------------------------------
    # IMPORTANT: Prevent duplicate proposals
    # One freelancer can apply ONLY ONCE per project
    # ------------------------------------------------------------------
    class Meta:
        unique_together = ('project', 'freelancer')
        ordering = ['-created_at']

    def __str__(self):
 Group-C-feature/projectproposal-Ambika-clean
        return f"{self.freelancer} → {self.project_title} ({self.status})"

        return f"{self.freelancer} → {self.project.title} ({self.status})"
 main-group-C
