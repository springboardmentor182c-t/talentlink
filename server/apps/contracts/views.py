# contracts/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.permissions import BasePermission

from .models import Contract
from .serializers import ContractSerializer
from apps.proposals.models import Proposal
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.db.models import Q

# ---- Permission (tighten later when JWT is on) -----------------------
class IsContractParty(BasePermission):
    """
    Allow only client/freelancer on the contract (and staff).
    While you're testing with AllowAny elsewhere, this returns True for anonymous.
    Switch your views to IsAuthenticated + IsContractParty once auth is ready.
    """
    def has_object_permission(self, request, view, obj: Contract):
        u = request.user
        if not u.is_authenticated:
            return True
        return u.is_staff or obj.client_id == u.id or obj.freelancer_id == u.id


# ---- CREATE: from accepted proposal ----------------------------------
class CreateContractFromProposal(APIView):
    permission_classes = [IsAuthenticated]   # ← require login

    def post(self, request, proposal_id):
        try:
            proposal = Proposal.objects.get(id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=404)

        # only the proposal's client may create the contract
        if proposal.client_id != request.user.id and not request.user.is_staff:
            return Response({"error": "Only the client can create this contract."}, status=403)

        if getattr(proposal, "status", None) != "accepted":
            return Response({"error": "Contract can be created only from accepted proposals."}, status=400)

        if hasattr(proposal, "contract"):
            return Response({"error": "Contract already exists for this proposal."}, status=400)

        client = getattr(proposal, "client", None)
        freelancer = getattr(proposal, "freelancer", None)
        if not client or not freelancer:
            return Response({"error": "Could not infer client/freelancer from Proposal."}, status=400)

        data = {
            "title": request.data.get("title", f"Contract for Proposal {proposal.id}"),
            "terms": request.data.get("terms", ""),
            "start_date": request.data.get("start_date"),
            "end_date": request.data.get("end_date"),
        }
        serializer = ContractSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        contract = serializer.save(
            proposal=proposal, client=client, freelancer=freelancer, status="active"
        )
        return Response(ContractSerializer(contract).data, status=201)


class ContractList(generics.ListAPIView):
    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Contract.objects.all().order_by('-created_at')
        u = self.request.user
        # non-staff users see only their own contracts
        if not u.is_staff:
            qs = qs.filter(Q(client_id=u.id) | Q(freelancer_id=u.id))

        # optional filters
        c = self.request.query_params.get('client')
        f = self.request.query_params.get('freelancer')
        s = self.request.query_params.get('status')
        if c: qs = qs.filter(client_id=c)
        if f: qs = qs.filter(freelancer_id=f)
        if s: qs = qs.filter(status=s)
        return qs


class ContractDetail(generics.RetrieveAPIView):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated, IsContractParty]


class ContractUpdate(generics.UpdateAPIView):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated, IsContractParty]
    http_method_names = ['patch']