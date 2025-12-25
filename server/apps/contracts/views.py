

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import BasePermission, IsAuthenticated
from django.db.models import Q
from django.shortcuts import get_object_or_404

from .models import Contract
from .serializers import ContractSerializer
from apps.proposals.models import Proposal


# ---------- PERMISSION ----------
class IsContractParty(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.is_authenticated and (
            user.is_staff or obj.client == user or obj.freelancer == user
        )


# ---------- CREATE CONTRACT ----------
class ContractCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        proposal_id = request.data.get("proposal_id")

        if not proposal_id:
            return Response(
                {"error": "proposal_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        proposal = get_object_or_404(
            Proposal.objects.select_related("project__client", "freelancer"),
            id=proposal_id
        )

        # Security
        if proposal.project.client != request.user and not request.user.is_staff:
            return Response(
                {"error": "Unauthorized"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Prevent duplicate contract
        if Contract.objects.filter(proposal=proposal).exists():
            return Response(
                {"error": "Contract already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Auto accept proposal
        if proposal.status != "accepted":
            proposal.status = "accepted"
            proposal.save()

        contract = Contract.objects.create(
            proposal=proposal,
            client=request.user,
            freelancer=proposal.freelancer,
            title=request.data.get("title", proposal.project.title),
            terms=request.data.get("terms", proposal.cover_letter),
            total_amount=request.data.get("total_amount", proposal.bid_amount),
            start_date=request.data.get("start_date"),
            end_date=request.data.get("end_date"),
            status="active"
        )

        return Response(
            ContractSerializer(contract).data,
            status=status.HTTP_201_CREATED
        )


# ---------- LIST ----------
class ContractList(generics.ListAPIView):
    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Contract.objects.select_related(
            "client", "freelancer"
        ).order_by("-created_at")

        user = self.request.user
        if not user.is_staff:
            qs = qs.filter(Q(client=user) | Q(freelancer=user))

        return qs


# ---------- DETAIL ----------
class ContractDetail(generics.RetrieveAPIView):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated, IsContractParty]


# ---------- UPDATE ----------
class ContractUpdate(generics.UpdateAPIView):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated, IsContractParty]
    http_method_names = ["patch"]
