from django.conf import settings
from django.db import models
import os


class FreelancerProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="freelancer_profile",
    )
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=255, blank=True, help_text="Professional headline")
    bio = models.TextField(blank=True)
    skills = models.TextField(blank=True, help_text="Comma separated skills")
    hourly_rate = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    location = models.CharField(max_length=255, blank=True)
    languages = models.TextField(blank=True, help_text="Comma separated languages")
    portfolio_links = models.TextField(blank=True, help_text="Comma separated URLs")
    availability = models.BooleanField(default=True)
    profile_image = models.ImageField(upload_to='freelancer_profiles/', null=True, blank=True)
    documents = models.FileField(upload_to='freelancer_documents/', null=True, blank=True, help_text="Resume or portfolio document")
    profile_completeness = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_completeness(self):
        """Calculate profile completeness percentage"""
        fields = [
            self.first_name,
            self.last_name,
            self.title,
            self.bio,
            self.skills,
            self.hourly_rate,
            self.location,
            self.languages,
            self.portfolio_links,
            self.profile_image,
            self.documents
        ]
        completed = sum(1 for field in fields if field)
        self.profile_completeness = int((completed / len(fields)) * 100)
        return self.profile_completeness

    def save(self, *args, **kwargs):
        self.calculate_completeness()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.user.username}'s profile"


class ClientProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="client_profile",
    )
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    company_name = models.CharField(max_length=255, blank=True)
    company_description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='client_profiles/', null=True, blank=True)
    documents = models.FileField(upload_to='client_documents/', null=True, blank=True, help_text="Company documents")
    profile_completeness = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_completeness(self):
        """Calculate profile completeness percentage"""
        fields = [
            self.first_name,
            self.last_name,
            self.company_name,
            self.company_description,
            self.website,
            self.phone,
            self.location,
            self.country,
            self.bio,
            self.profile_image,
            self.documents
        ]
        completed = sum(1 for field in fields if field)
        self.profile_completeness = int((completed / len(fields)) * 100)
        return self.profile_completeness

    def save(self, *args, **kwargs):
        self.calculate_completeness()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.user.username}'s client profile"
