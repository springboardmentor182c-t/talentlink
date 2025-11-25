from django.urls import path
from .views import SubmitProposalView, ProjectProposalsView, UpdateProposalStatusView

urlpatterns = [
    path('', SubmitProposalView.as_view(), name='submit_proposal'),
    path('project/<int:project_id>/', ProjectProposalsView.as_view(), name='project_proposals'),
    path('<int:proposal_id>/status/', UpdateProposalStatusView.as_view(), name='update_proposal_status'),
]
