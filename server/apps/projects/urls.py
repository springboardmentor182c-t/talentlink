from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
	ProjectViewSet,
	ProposalsPerProjectAPIView,
	FreelancersPerSkillAPIView,
	ProjectActivityAPIView,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
	path("", include(router.urls)),
	path("analytics/proposals-per-project/", ProposalsPerProjectAPIView.as_view(), name="proposals-per-project"),
	path("analytics/freelancers-per-skill/", FreelancersPerSkillAPIView.as_view(), name="freelancers-per-skill"),
	path("analytics/project-activity/", ProjectActivityAPIView.as_view(), name="project-activity"),
]
