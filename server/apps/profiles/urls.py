from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FreelancerProfileViewSet

router = DefaultRouter()
router.register(r'', FreelancerProfileViewSet, basename='freelancer-profile')

urlpatterns = [
    path('', include(router.urls)),
]