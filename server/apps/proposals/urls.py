 Group-C-feature/projectproposal-Ambika
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProposalViewSet

router = DefaultRouter()
router.register(r"", ProposalViewSet, basename="proposal")

urlpatterns = [
    path("", include(router.urls)),
]



from django.urls import path
from .views import (
    ProposalListCreateView, 
    ProposalDetailView, 
    AcceptProposalView, 
    ReceivedProposalsList, # Import the new view
    HireProposalView
)

urlpatterns = [
    # Path: /api/proposals/
    path('', ProposalListCreateView.as_view(), name='proposal-list-create'),

    # Path: /api/proposals/received/  <-- NEW PATH (Must be before <int:pk>)
    path('received/', ReceivedProposalsList.as_view(), name='received-proposals'),

    # Path: /api/proposals/5/
    path('<int:pk>/', ProposalDetailView.as_view(), name='proposal-detail'),

    # Path: /api/proposals/5/accept/
    path('<int:pk>/accept/', AcceptProposalView.as_view(), name='proposal-accept'),

    path('proposals/<int:pk>/hire/', HireProposalView.as_view(), name='hire-proposal'),

]
 main-group-C
