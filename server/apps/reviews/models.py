from django.db import models
from django.conf import settings
from apps.projects.models import Project


class Review(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='given_reviews'
    )
    reviewed_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_reviews'
    )
    rating = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('project', 'reviewer')

    def __str__(self):
        return f"{self.reviewer} → {self.reviewed_user} ({self.rating})"
