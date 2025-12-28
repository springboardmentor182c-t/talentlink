from django.urls import path
from .views import FreelancerDashboardAnalytics

urlpatterns = [
    path('freelancer/dashboard-analytics/', FreelancerDashboardAnalytics.as_view(), name='freelancer-dashboard-analytics'),
]
