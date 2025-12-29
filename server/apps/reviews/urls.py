from django.urls import path
from .views import CreateReviewAPIView

urlpatterns = [
    path('projects/<int:project_id>/review/', CreateReviewAPIView.as_view()),
]
