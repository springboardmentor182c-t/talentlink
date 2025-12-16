from django.urls import path
from .views import (
    CreateContractFromProposal, ContractList, ContractDetail, ContractUpdate
)

urlpatterns = [
    path("create/<int:proposal_id>/", CreateContractFromProposal.as_view()),
    path("", ContractList.as_view()),
    path("<int:pk>/", ContractDetail.as_view()),
    path("<int:pk>/update/", ContractUpdate.as_view()),
]
