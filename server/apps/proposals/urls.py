# from django.urls import path
# from .views import ProposalListCreateView, ProposalDetailView, AcceptProposalView

# urlpatterns = [
#     # Path: /api/proposals/
#     path('', ProposalListCreateView.as_view(), name='proposal-list-create'),

#     # Path: /api/proposals/5/
#     path('<int:pk>/', ProposalDetailView.as_view(), name='proposal-detail'),

#     # Path: /api/proposals/5/accept/  <-- Use this URL in your "Hire" button
#     path('<int:pk>/accept/', AcceptProposalView.as_view(), name='proposal-accept'),
# ]


from django.urls import path
from .views import (
    ProposalListCreateView, 
    ProposalDetailView, 
    AcceptProposalView, 
    ReceivedProposalsList # Import the new view
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
]