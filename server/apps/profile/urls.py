from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import FreelancerProfileViewSet, ClientProfileViewSet, ProfileViewSet, \
    client_profile_create, client_profile_edit, freelancer_profile_create, freelancer_profile_edit

router = DefaultRouter()
router.register(r"freelancer-profile", FreelancerProfileViewSet, basename="freelancer-profile")
router.register(r"client-profile", ClientProfileViewSet, basename="client-profile")
router.register(r"profile", ProfileViewSet, basename="profile")

urlpatterns = [
    path("", include(router.urls)),
    path("client/profile/create", client_profile_create, name="client-profile-create"),
    path("client/profile/edit", client_profile_edit, name="client-profile-edit"),
    path("freelancer/profile/create", freelancer_profile_create, name="freelancer-profile-create"),
    path("freelancer/profile/edit", freelancer_profile_edit, name="freelancer-profile-edit"),
]
