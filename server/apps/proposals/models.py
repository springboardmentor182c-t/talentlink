from django.db import models

# Create your models here.
#from django.db import models
from django.conf import settings

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('accepted', 'Accepted'),
    ('rejected', 'Rejected'),
]

class Proposal(models.Model):
    # Keep it simple for now
    project_title = models.CharField(max_length=200)
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='client_proposals',
        on_delete=models.CASCADE
    )
    freelancer = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='freelancer_proposals',
        on_delete=models.CASCADE
    )
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project_title} ({self.status})"
