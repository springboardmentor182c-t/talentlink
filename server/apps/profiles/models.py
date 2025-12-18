from django.db import models
from django.conf import settings

class FreelancerProfile(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('active', 'Active'),
        ('closed', 'Closed'),
    ]

    # One freelancer (user) can create multiple profile listings
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='freelancer_profiles'
    )

    project_title = models.CharField(max_length=255)
    description = models.TextField(help_text="Profile / Service description")
    budget = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Hourly rate or service budget"
    )
    required_skills = models.TextField(help_text="Comma separated skills")
    experience_years = models.PositiveIntegerField(default=0)

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='open'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.project_title} - {self.user}"
