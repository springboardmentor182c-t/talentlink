from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import FreelancerProfileViewSet, freelancer_dashboard, freelancer_profile, freelancer_profile_update, freelancer_jobs

router = DefaultRouter()
router.register(r"profile", FreelancerProfileViewSet, basename="freelancer-profile")

urlpatterns = [
    path("", include(router.urls)),
    
    # Freelancer dashboard endpoints
    path("dashboard/", freelancer_dashboard, name="freelancer-dashboard"),
    path("profile/dashboard/", freelancer_profile, name="freelancer-profile-dashboard"),
    path("profile/update/", freelancer_profile_update, name="freelancer-profile-update"),
    path("jobs/", freelancer_jobs, name="freelancer-jobs"),
]