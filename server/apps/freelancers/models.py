from django.conf import settings
from django.db import models


class FreelancerProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="freelancer_profile",
    )
    title = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    skills = models.TextField(blank=True, help_text="Comma separated skills")
    hourly_rate = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    location = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.user.username}'s profile"

