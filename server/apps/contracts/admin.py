from django.contrib import admin
from .models import Contract, ContractMilestone, ContractActivity


class ContractMilestoneInline(admin.TabularInline):
    model = ContractMilestone
    extra = 0
    readonly_fields = ['created_at']


class ContractActivityInline(admin.TabularInline):
    model = ContractActivity
    extra = 0
    readonly_fields = ['created_at']
    ordering = ['-created_at']


@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'freelancer', 'client', 'contract_type', 
        'total_amount', 'status', 'progress_percentage', 
        'start_date', 'end_date', 'created_at'
    ]
    list_filter = [
        'status', 'contract_type', 'created_at', 'start_date', 'end_date'
    ]
    search_fields = [
        'title', 'description', 'freelancer__username', 'client__username'
    ]
    readonly_fields = [
        'created_at', 'updated_at', 'signed_at', 'completed_at',
        'amount_paid', 'amount_in_escrow', 'remaining_amount',
        'payment_progress_percentage', 'is_overdue'
    ]
    inlines = [ContractMilestoneInline, ContractActivityInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('proposal', 'title', 'description', 'contract_type', 'status')
        }),
        ('Parties', {
            'fields': ('freelancer', 'client')
        }),
        ('Financial Details', {
            'fields': (
                'total_amount', 'hourly_rate', 'max_hours',
                'amount_paid', 'amount_in_escrow', 'remaining_amount',
                'payment_progress_percentage'
            )
        }),
        ('Timeline', {
            'fields': ('start_date', 'end_date', 'expected_delivery_date', 'is_overdue')
        }),
        ('Progress', {
            'fields': ('progress_percentage',)
        }),
        ('Additional Information', {
            'fields': ('requirements', 'deliverables', 'terms_and_conditions'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'signed_at', 'completed_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ContractMilestone)
class ContractMilestoneAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'contract', 'amount', 'status', 
        'due_date', 'order', 'created_at'
    ]
    list_filter = ['status', 'due_date', 'created_at']
    search_fields = ['title', 'description', 'contract__title']
    readonly_fields = ['created_at', 'completed_at', 'approved_at']


@admin.register(ContractActivity)
class ContractActivityAdmin(admin.ModelAdmin):
    list_display = [
        'contract', 'user', 'activity_type', 'description', 'created_at'
    ]
    list_filter = ['activity_type', 'created_at']
    search_fields = ['description', 'contract__title', 'user__username']
    readonly_fields = ['created_at']
    ordering = ['-created_at']