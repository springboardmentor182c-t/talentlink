from django.urls import path
from . import views

app_name = 'comments'

urlpatterns = [
    # Add your comment-related URL patterns here
    path('', views.index, name='index'),
]