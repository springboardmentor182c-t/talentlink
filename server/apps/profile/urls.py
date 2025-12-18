from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import FreelancerProfileViewSet, ClientProfileViewSet, ProfileViewSet

router = DefaultRouter()
router.register(r"freelancer-profile", FreelancerProfileViewSet, basename="freelancer-profile")
router.register(r"client-profile", ClientProfileViewSet, basename="client-profile")
router.register(r"profile", ProfileViewSet, basename="profile")

urlpatterns = [
    path("", include(router.urls)),
]
