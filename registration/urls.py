from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login, CustomUserCreate, CurrentUserDetail, BlogPostCreate, BlogPostList, DoctorViewSet, AppointmentViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet, basename='doctor')
router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name='account-register'),
    path('login/', login, name='login'),
    path('user/', CurrentUserDetail.as_view(), name='current-user-detail'),
    path('blogpost/new/', BlogPostCreate.as_view(), name='blogpost-create'),
    path('blogpost/', BlogPostList.as_view(), name='blogpost-list'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),  # add this line
]