from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProposalViewSet, ProposalListView, ProposalDetailView, ClientProposalsView

# Router for ViewSet
router = DefaultRouter()
router.register(r'', ProposalViewSet, basename='proposal')

urlpatterns = [
    # Include router URLs
    path('', include(router.urls)),
    
    # Additional endpoints
    path('client-proposals/', ClientProposalsView.as_view(), name='client-proposals'),
]
