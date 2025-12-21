# from django.db import models

# # Create your models here.
# #from django.db import models
# from django.conf import settings

# STATUS_CHOICES = [
#     ('pending', 'Pending'),
#     ('accepted', 'Accepted'),
#     ('rejected', 'Rejected'),
# ]

# class Proposal(models.Model):
#     # Keep it simple for now
#     project_title = models.CharField(max_length=200)
#     client = models.ForeignKey(
#         settings.AUTH_USER_MODEL, related_name='client_proposals',
#         on_delete=models.CASCADE
#     )
#     freelancer = models.ForeignKey(
#         settings.AUTH_USER_MODEL, related_name='freelancer_proposals',
#         on_delete=models.CASCADE
#     )
#     bid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.project_title} ({self.status})"



# from django.db import models
# from django.conf import settings
# # Import the Project model so we can link to it
# from apps.projects.models import Project 

# STATUS_CHOICES = [
#     ('pending', 'Pending'),
#     ('sent', 'Sent'), 
#     ('accepted', 'Accepted'),
#     ('rejected', 'Rejected'),
# ]

# class Proposal(models.Model):
#     # --- 1. THE FIX: Link to the actual Project ---
#     project = models.ForeignKey(
#         Project, 
#         on_delete=models.CASCADE, 
#         related_name='proposals'
#     )

#     # --- 2. Link to the Freelancer ---
#     freelancer = models.ForeignKey(
#         settings.AUTH_USER_MODEL, 
#         related_name='freelancer_proposals',
#         on_delete=models.CASCADE
#     )

#     # --- 3. Proposal Details ---
#     bid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
#     cover_letter = models.TextField(blank=True, null=True)  # Useful for the freelancer's message
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         # We access the title through the related project now
#         return f"Proposal for {self.project.title} ({self.status})"


from django.db import models
from django.conf import settings
# Import the Project model so we can link to it
from apps.projects.models import Project 

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('sent', 'Sent'), 
    ('accepted', 'Accepted'),
    ('rejected', 'Rejected'),
]

class Proposal(models.Model):
    # --- 1. THE FIX: Link to the actual Project ---
    project = models.ForeignKey(
        Project, 
        on_delete=models.CASCADE, 
        related_name='proposals'
    )

    # --- 2. Link to the Freelancer ---
    freelancer = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='freelancer_proposals',
        on_delete=models.CASCADE
    )

    # --- 3. Proposal Details ---
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cover_letter = models.TextField(blank=True, null=True)  # Useful for the freelancer's message
    
    # --- ADDED THIS MISSING FIELD ---
    estimated_days = models.IntegerField(default=7)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # We access the title through the related project now
        return f"Proposal for {self.project.title} ({self.status})"