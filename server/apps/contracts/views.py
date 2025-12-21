# # contracts/views.py

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status, generics, permissions
# from rest_framework.permissions import BasePermission

# from .models import Contract
# from .serializers import ContractSerializer
# from apps.proposals.models import Proposal
# from rest_framework.permissions import IsAuthenticated, BasePermission
# from django.db.models import Q

# # ---- Permission (tighten later when JWT is on) -----------------------
# class IsContractParty(BasePermission):
#     """
#     Allow only client/freelancer on the contract (and staff).
#     While you're testing with AllowAny elsewhere, this returns True for anonymous.
#     Switch your views to IsAuthenticated + IsContractParty once auth is ready.
#     """
#     def has_object_permission(self, request, view, obj: Contract):
#         u = request.user
#         if not u.is_authenticated:
#             return True
#         return u.is_staff or obj.client_id == u.id or obj.freelancer_id == u.id


# # ---- CREATE: from accepted proposal ----------------------------------
# class CreateContractFromProposal(APIView):
#     permission_classes = [IsAuthenticated]   # ← require login

#     def post(self, request, proposal_id):
#         try:
#             proposal = Proposal.objects.get(id=proposal_id)
#         except Proposal.DoesNotExist:
#             return Response({"error": "Proposal not found"}, status=404)

#         # only the proposal's client may create the contract
#         if proposal.client_id != request.user.id and not request.user.is_staff:
#             return Response({"error": "Only the client can create this contract."}, status=403)

#         if getattr(proposal, "status", None) != "accepted":
#             return Response({"error": "Contract can be created only from accepted proposals."}, status=400)

#         if hasattr(proposal, "contract"):
#             return Response({"error": "Contract already exists for this proposal."}, status=400)

#         client = getattr(proposal, "client", None)
#         freelancer = getattr(proposal, "freelancer", None)
#         if not client or not freelancer:
#             return Response({"error": "Could not infer client/freelancer from Proposal."}, status=400)

#         data = {
#             "title": request.data.get("title", f"Contract for Proposal {proposal.id}"),
#             "terms": request.data.get("terms", ""),
#             "start_date": request.data.get("start_date"),
#             "end_date": request.data.get("end_date"),
#         }
#         serializer = ContractSerializer(data=data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=400)

#         contract = serializer.save(
#             proposal=proposal, client=client, freelancer=freelancer, status="active"
#         )
#         return Response(ContractSerializer(contract).data, status=201)


# class ContractList(generics.ListAPIView):
#     serializer_class = ContractSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         qs = Contract.objects.all().order_by('-created_at')
#         u = self.request.user
#         # non-staff users see only their own contracts
#         if not u.is_staff:
#             qs = qs.filter(Q(client_id=u.id) | Q(freelancer_id=u.id))

#         # optional filters
#         c = self.request.query_params.get('client')
#         f = self.request.query_params.get('freelancer')
#         s = self.request.query_params.get('status')
#         if c: qs = qs.filter(client_id=c)
#         if f: qs = qs.filter(freelancer_id=f)
#         if s: qs = qs.filter(status=s)
#         return qs


# class ContractDetail(generics.RetrieveAPIView):
#     queryset = Contract.objects.all()
#     serializer_class = ContractSerializer
#     permission_classes = [IsAuthenticated, IsContractParty]


# class ContractUpdate(generics.UpdateAPIView):
#     queryset = Contract.objects.all()
#     serializer_class = ContractSerializer
#     permission_classes = [IsAuthenticated, IsContractParty]
#     http_method_names = ['patch']




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.permissions import BasePermission, IsAuthenticated
from django.db.models import Q
from django.shortcuts import get_object_or_404

from .models import Contract
from .serializers import ContractSerializer
from apps.proposals.models import Proposal

# ---- Permission (tighten later when JWT is on) -----------------------
class IsContractParty(BasePermission):
    """
    Allow only client/freelancer on the contract (and staff).
    """
    def has_object_permission(self, request, view, obj: Contract):
        u = request.user
        if not u.is_authenticated:
            return False  # Strict security: Anonymous users cannot see contracts
        return u.is_staff or obj.client == u or obj.freelancer == u


# ---- CREATE: from accepted proposal (Legacy/URL based) ---------------
class CreateContractFromProposal(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, proposal_id):
        # 1. Fetch proposal with relationships
        try:
            # We fetch project__client to verify ownership
            proposal = Proposal.objects.select_related('project__client', 'freelancer').get(id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=status.HTTP_404_NOT_FOUND)

        # 2. Derive Client from the Project
        client = proposal.project.client
        freelancer = proposal.freelancer

        # 3. Security: Only the Project Owner (Client) can create the contract
        if client.id != request.user.id and not request.user.is_staff:
            return Response({"error": "Only the client who owns this project can create the contract."}, status=status.HTTP_403_FORBIDDEN)

        # 4. Validation: Status Check
        if proposal.status != "accepted":
            return Response({"error": "Contract can be created only from accepted proposals."}, status=status.HTTP_400_BAD_REQUEST)

        # 5. Validation: Check if exists
        if Contract.objects.filter(proposal=proposal).exists():
            return Response({"error": "Contract already exists for this proposal."}, status=status.HTTP_400_BAD_REQUEST)

        # 6. Prepare Data
        data = {
            "title": request.data.get("title", f"Contract for {proposal.project.title}"),
            "terms": request.data.get("terms", proposal.cover_letter),
            "start_date": request.data.get("start_date"),
            "end_date": request.data.get("end_date"),
            "total_amount": request.data.get("total_amount", proposal.bid_amount),
            "status": "active"
        }

        serializer = ContractSerializer(data=data)
        if serializer.is_valid():
            # 7. Save (REMOVED 'project' argument here to fix the TypeError)
            contract = serializer.save(
                proposal=proposal,
                client=client,
                freelancer=freelancer
            )
            return Response(ContractSerializer(contract).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---- NEW CREATE: From Client Modal (Body based) ----------------------
class ContractCreate(APIView):
    """
    Handles the 'Hire' action from the React Client Dashboard.
    Expects JSON payload with 'proposal_id', 'title', 'total_amount', etc.
    Automatically marks proposal as 'accepted'.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        proposal_id = data.get('proposal_id')

        # 1. Validation
        if not proposal_id:
            return Response({"error": "proposal_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Fetch Proposal
        proposal = get_object_or_404(Proposal, id=proposal_id)

        # 3. Security: Ensure the logged-in user is the Client of the project
        if proposal.project.client != request.user and not request.user.is_staff:
            return Response({"error": "Unauthorized: You are not the client for this project."}, status=status.HTTP_403_FORBIDDEN)

        # 4. Check if Contract already exists
        if Contract.objects.filter(proposal=proposal).exists():
            return Response({"error": "A contract already exists for this proposal."}, status=status.HTTP_400_BAD_REQUEST)

        # 5. Auto-Accept Proposal (The "Hire" action)
        if proposal.status != 'accepted':
            proposal.status = 'accepted'
            proposal.save()

        # 6. Create Contract
        try:
            contract = Contract.objects.create(
                proposal=proposal,
                client=request.user,
                freelancer=proposal.freelancer,
                title=data.get('title', proposal.project.title),
                terms=data.get('terms', proposal.cover_letter),  # React sends 'terms' (mapped from description)
                start_date=data.get('start_date'),               # React sends 'start_date'
                # end_date is optional
                total_amount=data.get('total_amount', proposal.bid_amount),
                status='active'                                  # Default to active upon hiring
            )
            return Response(ContractSerializer(contract).data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ---- LIST & DETAILS --------------------------------------------------
class ContractList(generics.ListAPIView):
    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # REMOVED 'project' from select_related because the model doesn't have it
        qs = Contract.objects.select_related('client', 'freelancer').all().order_by('-created_at')
        u = self.request.user
        
        # non-staff users see only their own contracts
        if not u.is_staff:
            qs = qs.filter(Q(client=u) | Q(freelancer=u))

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