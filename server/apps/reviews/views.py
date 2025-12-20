from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Review
from .serializers import ReviewSerializer
from apps.projects.models import Project


class CreateReviewAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, project_id):
        user = request.user
        rating = request.data.get('rating')
        comment = request.data.get('comment', '')

        # Validate project
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Project must be CLOSED
        if project.status != Project.CLOSED:
            return Response(
                {"error": "Project must be completed before reviewing"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Determine reviewer & reviewed user
        if user == project.freelancer:
            reviewed_user = project.client     # Task 1
        elif user == project.client:
            reviewed_user = project.freelancer # Task 2
        else:
            return Response(
                {"error": "You are not part of this project"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Prevent duplicate reviews
        if Review.objects.filter(project=project, reviewer=user).exists():
            return Response(
                {"error": "You have already reviewed this project"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save review
        review = Review.objects.create(
            project=project,
            reviewer=user,
            reviewed_user=reviewed_user,
            rating=rating,
            comment=comment
        )

        serializer = ReviewSerializer(review)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

