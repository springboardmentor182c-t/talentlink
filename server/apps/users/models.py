from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('freelancer', 'Freelancer'),
        ('client', 'Client'),
        ('both', 'Both Freelancer and Client'),
    ]
    
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPE_CHOICES,
        default='freelancer'
    )

    class Meta:
        db_table = 'auth_user'

    def __str__(self):
        return f"{self.username} ({self.user_type})"
