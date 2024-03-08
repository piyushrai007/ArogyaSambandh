from django.urls import path
from .views import login, CustomUserCreate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView  # Add this line
from .views import login, CustomUserCreate, CurrentUserDetail, BlogPostCreate, BlogPostList
from django.urls import path
from .views import login, CustomUserCreate, CurrentUserDetail  # Import CurrentUserDetail

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name='account-register'),
    path('login/', login, name='login'),
    path('user/', CurrentUserDetail.as_view(), name='current-user-detail'),  # Add this line
    path('blogpost/new/', BlogPostCreate.as_view(), name='blogpost-create'),
    path('blogpost/', BlogPostList.as_view(), name='blogpost-list'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]