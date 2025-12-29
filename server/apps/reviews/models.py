from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from apps.projects.models import Project

User = settings.AUTH_USER_MODEL

class Review(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    reviewer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='given_reviews'
    )

    rating_overall = models.DecimalField(max_digits=2, decimal_places=1)

    rating_quality = models.PositiveSmallIntegerField()
    rating_communication = models.PositiveSmallIntegerField()
    rating_timeliness = models.PositiveSmallIntegerField()
    rating_professionalism = models.PositiveSmallIntegerField()

    review_text = models.TextField()
    would_recommend = models.BooleanField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('project', 'reviewer')

    def __str__(self):
        return f"{self.project} - {self.reviewer}"
