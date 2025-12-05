from rest_framework import routers
from .views import ProjectViewSet, SavedProjectViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'saved', SavedProjectViewSet, basename='savedproject')

urlpatterns = [
    path('', include(router.urls)),
]
