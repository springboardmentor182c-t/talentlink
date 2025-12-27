from django.db import models
from django.conf import settings

# 1. Skill Model
class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name

# 2. Project Model
class Project(models.Model):
    POSTED = 'posted'
    OPEN = 'open'
    CLOSED = 'closed'

    STATUS_CHOICES = [
        (POSTED, 'Posted'),
        (OPEN, 'Open'),
        (CLOSED, 'Closed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    client = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='projects', on_delete=models.CASCADE)
    skills = models.JSONField(default=list, blank=True)
    budget_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    budget_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    duration_days = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=POSTED)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# (Proposal Class removed from here)