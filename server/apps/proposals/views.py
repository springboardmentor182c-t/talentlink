
from django.contrib.auth import get_user_model
from rest_framework import viewsets, generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import ProjectProposal, ProposalAttachment
from .serializers import ProposalSerializer, ProposalAttachmentSerializer

User = get_user_model()

class ProposalViewSet(viewsets.ModelViewSet):
    queryset = ProjectProposal.objects.all().order_by("-created_at")
    serializer_class = ProposalSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        project_id = self.request.query_params.get("project_id")
        if project_id:
            return self.queryset.filter(project_id=project_id)
        return self.queryset

class ProposalCreateView(generics.CreateAPIView):
    queryset = ProjectProposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()

        if self.request.user.is_authenticated:
            context["freelancer"] = self.request.user
        else:
            anonymous_user, _ = User.objects.get_or_create(
                username="anonymous",
                defaults={"email": "anonymous@example.com"}
            )
            context["freelancer"] = anonymous_user

        return context

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            print("Error creating proposal:", e)
            raise


class ProposalAttachmentUploadView(generics.CreateAPIView):
    serializer_class = ProposalAttachmentSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]

    def post(self, request, proposal_id, *args, **kwargs):
        proposal = get_object_or_404(ProjectProposal, id=proposal_id)
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'detail': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        attachment = ProposalAttachment.objects.create(proposal=proposal, file=file_obj)
        serializer = self.get_serializer(attachment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
