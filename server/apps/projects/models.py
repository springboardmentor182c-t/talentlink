from django.db import models


class Project(models.Model):
    EXPERIENCE_LEVEL_CHOICES = [
        ('Any', 'Any'),
        ('Junior', 'Junior'),
        ('Mid-level', 'Mid-level'),
        ('Senior', 'Senior'),
    ]

    PROJECT_TYPE_CHOICES = [
        ('Fixed Price', 'Fixed Price'),
        ('Hourly', 'Hourly'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('draft', 'Draft'),
        ('closed', 'Closed'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    skills = models.TextField(help_text="Comma-separated skills, e.g. React, Node.js")

    min_budget = models.IntegerField(null=True, blank=True)
    max_budget = models.IntegerField(null=True, blank=True)

    duration = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=100, blank=True)

    experience_level = models.CharField(
        max_length=20,
        choices=EXPERIENCE_LEVEL_CHOICES,
        default='Any'
    )
    project_type = models.CharField(
        max_length=20,
        choices=PROJECT_TYPE_CHOICES,
        default='Fixed Price'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    from django.conf import settings
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projects",
        null=True,
        blank=True,
        help_text="The client (user) who owns this project."
    )

    def __str__(self):
        return self.title
