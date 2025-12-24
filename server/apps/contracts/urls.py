from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContractViewSet, ContractMilestoneViewSet

router = DefaultRouter()
router.register(r'contracts', ContractViewSet, basename='contract')
router.register(r'milestones', ContractMilestoneViewSet, basename='milestone')

urlpatterns = [
    path('', include(router.urls)),
]