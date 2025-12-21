from django.urls import path
from .views import (
    CreateContractFromProposal, 
    ContractList, 
    ContractDetail, 
    ContractUpdate,
    ContractCreate  # <--- Import the new view
)

urlpatterns = [
    # 1. New Pattern: Matches axios.post("/contracts/create/") from your React Modal
    # This expects the proposal_id inside the JSON body.
    path("create/", ContractCreate.as_view(), name='contract-create-manual'),

    # 2. Old Pattern: Matches calls with ID in URL (Keep for safety)
    path("create/<int:proposal_id>/", CreateContractFromProposal.as_view(), name='contract-create-from-proposal'),

    # 3. Standard List and Detail views
    path("", ContractList.as_view(), name='contract-list'),
    path("<int:pk>/", ContractDetail.as_view(), name='contract-detail'),
    path("<int:pk>/update/", ContractUpdate.as_view(), name='contract-update'),
]