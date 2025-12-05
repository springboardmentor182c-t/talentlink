from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProposalCreateView, ProposalViewSet

router = DefaultRouter()
router.register(r'proposals', ProposalViewSet, basename='proposal')

urlpatterns = [
    path("", include(router.urls)),
    path("submit/", ProposalCreateView.as_view(), name="proposal-submit"),
]
