from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectListView, ProjectDetailView, ProjectStatsView

# Router for ViewSet
router = DefaultRouter()
router.register(r'', ProjectViewSet, basename='project')

urlpatterns = [
    # Include router URLs
    path('', include(router.urls)),
    
    # Additional endpoints
    path('stats/', ProjectStatsView.as_view(), name='project-stats'),
]
