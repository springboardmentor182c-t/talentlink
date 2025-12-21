# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ProjectViewSet, SkillViewSet  # <--- Import SkillViewSet

# router = DefaultRouter()
# # This handles GET /api/v1/projects/ and POST /api/v1/projects/
# router.register(r'skills', SkillViewSet, basename='skills') # <--- New Endpoint
# router.register(r'', ProjectViewSet, basename='projects')

# urlpatterns = [
#     path('', include(router.urls)),
# ]



from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, SkillViewSet, ProposalViewSet, get_open_projects

router = DefaultRouter()
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'proposals', ProposalViewSet, basename='proposals')
router.register(r'', ProjectViewSet, basename='projects')

urlpatterns = [
    # 1. Specific Paths (MUST BE FIRST)
    path('open/', get_open_projects, name='open-projects'),
    
    # 2. Router Paths (Catch-all)
    path('', include(router.urls)),
]
