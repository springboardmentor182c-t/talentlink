from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProposalCreateView, ProposalViewSet

router = DefaultRouter()
router.register(r'', ProposalViewSet, basename='proposal')

urlpatterns = [
    path("submit/", ProposalCreateView.as_view(), name="proposal-submit"),
    path("", include(router.urls)),
]
