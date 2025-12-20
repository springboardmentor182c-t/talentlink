from django.db import models
from django.conf import settings


class Project(models.Model):
    POSTED = 'posted'
    OPEN = 'open'
    COMPLETED = 'completed'
    CLOSED = 'closed'

    STATUS_CHOICES = [
        (POSTED, 'Posted'),
        (OPEN, 'Open'),
        (COMPLETED, 'Completed'),
        (CLOSED, 'Closed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    client = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='projects', on_delete=models.CASCADE)
    freelancer = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    related_name='completed_projects',
    on_delete=models.SET_NULL,
    null=True,
    blank=True
)

    skills = models.JSONField(default=list, blank=True)
    budget_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    budget_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    duration_days = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=POSTED)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.client})"


class SavedProject(models.Model):
    freelancer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='saved_projects', on_delete=models.CASCADE)
    project = models.ForeignKey(Project, related_name='saved_by', on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('freelancer', 'project')

    def __str__(self):
        return f"{self.freelancer} saved {self.project}"
