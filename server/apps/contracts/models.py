from django.db import models
from django.conf import settings
from decimal import Decimal

User = settings.AUTH_USER_MODEL


class Contract(models.Model):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("pending", "Pending Approval"),
        ("active", "Active"),
        ("in_review", "In Review"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
        ("disputed", "Disputed"),
    ]

    CONTRACT_TYPE_CHOICES = [
        ("fixed", "Fixed Price"),
        ("hourly", "Hourly Rate"),
        ("milestone", "Milestone Based"),
    ]

    # Relationship to proposal
    proposal = models.OneToOneField(
        "proposals.ProjectProposal", 
        on_delete=models.CASCADE, 
        related_name="contract",
        null=True,
        blank=True
    )

    # Parties involved
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="freelancer_contracts")
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="client_contracts")

    # Contract details
    title = models.CharField(max_length=255)
    description = models.TextField()
    contract_type = models.CharField(max_length=20, choices=CONTRACT_TYPE_CHOICES, default="fixed")
    
    # Financial details
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    max_hours = models.IntegerField(null=True, blank=True)
    
    # Payment tracking
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    amount_in_escrow = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))

    # Timeline
    start_date = models.DateField()
    end_date = models.DateField()
    expected_delivery_date = models.DateField(null=True, blank=True)

    # Status and progress
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    progress_percentage = models.IntegerField(default=0)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    signed_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    # Additional fields
    requirements = models.TextField(blank=True)
    deliverables = models.TextField(blank=True)
    terms_and_conditions = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} - {self.freelancer} → {self.client} ({self.status})"

    @property
    def remaining_amount(self):
        return self.total_amount - self.amount_paid

    @property
    def payment_progress_percentage(self):
        if self.total_amount > 0:
            return int((self.amount_paid / self.total_amount) * 100)
        return 0

    @property
    def is_overdue(self):
        from django.utils import timezone
        if self.end_date and self.status in ["active", "in_review"]:
            return timezone.now().date() > self.end_date
        return False


class ContractMilestone(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("approved", "Approved"),
        ("paid", "Paid"),
    ]

    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name="milestones")
    title = models.CharField(max_length=255)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    order = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    approved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["order", "created_at"]

    def __str__(self):
        return f"{self.contract.title} - {self.title} ({self.status})"


class ContractActivity(models.Model):
    ACTIVITY_TYPES = [
        ("created", "Contract Created"),
        ("status_changed", "Status Changed"),
        ("milestone_completed", "Milestone Completed"),
        ("payment_made", "Payment Made"),
        ("milestone_approved", "Milestone Approved"),
        ("contract_completed", "Contract Completed"),
        ("contract_cancelled", "Contract Cancelled"),
        ("contract_disputed", "Contract Disputed"),
        ("note_added", "Note Added"),
    ]

    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name="activities")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=30, choices=ACTIVITY_TYPES)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.contract.title} - {self.get_activity_type_display()} by {self.user}"