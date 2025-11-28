from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Proposal
from .serializers import ProposalSerializer

class SubmitProposalView(generics.CreateAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer

    def post(self, request, *args, **kwargs):
        if request.user.role != "freelancer":
            return Response(
                {"error": "Only freelancers can submit proposals"},
                status=403
            )
        return super().post(request, *args, **kwargs)


class ProjectProposalsView(APIView):
    def get(self, request, project_id):
        if request.user.role != "client":
            return Response(
                {"error": "Only clients can view proposals"},
                status=403
            )

        proposals = Proposal.objects.filter(project=project_id)
        serializer = ProposalSerializer(proposals, many=True)
        return Response(serializer.data)

    
class UpdateProposalStatusView(APIView):
    def patch(self, request, proposal_id):
        if request.user.role != "client":
            return Response(
                {"error": "Only clients can update proposal status"},
                status=403
            )

        try:
            proposal = Proposal.objects.get(id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=404)

        new_status = request.data.get("status")
        proposal.status = new_status
        proposal.save()

        return Response({"message": "Status updated"})
