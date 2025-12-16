# SERVER/apps/projects/models.py

from django.db import models
# Import the base User model, which is the Freelancer/Client.
# Replace 'User' with your actual User model class name if different (e.g., 'CustomUser').
from apps.users.models import User 

class Skill(models.Model):
    # This is the Skill model you couldn't find.
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"


class Project(models.Model):
    # This is the Project model you couldn't find.
    FREELANCER_STATUS_CHOICES = [
        ('PENDING', 'Pending Review'),
        ('ACTIVE', 'Active'),
        ('COMPLETED', 'Completed'),
    ]

    # Foreign Key to the User/Freelancer who owns this project data
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_projects')
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    # Field used for monthly activity tracking in analytics views.py
    created_at = models.DateTimeField(auto_now_add=True) 
    
    # Many-to-Many field used for Skill-based tracking in analytics views.py
    skills = models.ManyToManyField(Skill, related_name='projects') 
    
    status = models.CharField(max_length=50, choices=FREELANCER_STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return self.title