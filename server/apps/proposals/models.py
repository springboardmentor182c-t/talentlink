


from django.db import models
from django.conf import settings
from apps.projects.models import Project

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
    created_at = models.DateTimeField(auto_now_add=True)

    # ------------------------------------------------------------------
    # IMPORTANT: Prevent duplicate proposals
    # One freelancer can apply ONLY ONCE per project
    # ------------------------------------------------------------------
    class Meta:
        unique_together = ('project', 'freelancer')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.freelancer} → {self.project.title} ({self.status})"
