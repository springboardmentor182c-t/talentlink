from django.urls import path
from . import views

app_name = 'reactions'

urlpatterns = [
    # Add your reaction-related URL patterns here
    path('', views.index, name='index'),
]