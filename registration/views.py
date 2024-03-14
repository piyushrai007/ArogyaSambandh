from django.contrib.auth import get_user_model
from rest_framework import generics, permissions  # Add permissions here
from .serializers import CustomUserSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser  # Add this line
from rest_framework import viewsets
from .models import BlogPost
from .serializers import BlogPostSerializer
from .models import Appointment
from .serializers import CustomUserSerializer, AppointmentSerializer, DoctorSerializer
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import os
from django.utils.timezone import make_aware
from googleapiclient.errors import HttpError

def google_calendar_service():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    credentials = Credentials.from_service_account_file(
        os.path.join(dir_path, 'google2.json'),
        scopes=['https://www.googleapis.com/auth/calendar']
    )
    service = build('calendar', 'v3', credentials=credentials)
    return service


def create_event(service, start_time, end_time, summary, description, location):
    try:
        event_result = service.events().insert(
            calendarId='primary',
            body={
                "summary": summary,
                "description": description,
                "location": location,
                "start": {"dateTime": start_time, "timeZone": 'Asia/Kolkata'},
                "end": {"dateTime": end_time, "timeZone": 'Asia/Kolkata'},
            }
        ).execute()

        return event_result['id']

    except HttpError as error:
        print(f'An error occurred: {error}')
        return None

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Appointment.objects.filter(patient=user)
        else:
            return Appointment.objects.none()  # return an empty queryset for non-patients

    def perform_create(self, serializer):
        appointment = serializer.save(patient=self.request.user)
        service = google_calendar_service()
        start_time = make_aware(appointment.start_time).isoformat()
        end_time = make_aware(appointment.end_time).isoformat()
        create_event(service, start_time, end_time, 'Appointment with ' + str(appointment.doctor), 'Appointment', 'Location')




class BlogPostCreate(generics.CreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class BlogPostList(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        category = self.request.query_params.get('category', None)

        if user.user_type == 'doctor':
            queryset = BlogPost.objects.all()
        else:
            queryset = BlogPost.objects.filter(draft=False)

        if category is not None:
            queryset = queryset.filter(category=category)

        return queryset
class CurrentUserDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)

    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user_type': user.user_type,  # assuming 'user_type' is a field on your User model
        'user_id': user.id  # include user id in the response
    }, status=HTTP_200_OK)

class CustomUserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer



class DoctorViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.filter(user_type='doctor')
    serializer_class = DoctorSerializer
