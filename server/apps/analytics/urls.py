# SERVER/apps/analytics/urls.py

from django.urls import path
from .views import ProjectAnalyticsView, SkillsAnalyticsView, ProposalAnalyticsView, DashboardStatsView

urlpatterns = [
    # API path: /api/v1/analytics/projects/
    path('projects/', ProjectAnalyticsView.as_view(), name='project-analytics'),
    
    # API path: /api/v1/analytics/proposals/
    path('proposals/', ProposalAnalyticsView.as_view(), name='proposal-status'),
    
    # API path: /api/v1/analytics/skills/
    path('skills/', SkillsAnalyticsView.as_view(), name='skills-analytics'),
    
    # API path: /api/v1/analytics/dashboard-stats/
    path('dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
]