from django.contrib.auth.models import Group, Permission
from rest_framework import serializers
from .models import CustomUser
from rest_framework import serializers
from .models import BlogPost


class CustomUserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(max_length=None, use_url=True)
    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True, required=False)
    user_permissions = serializers.PrimaryKeyRelatedField(queryset=Permission.objects.all(), many=True, required=False)
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'email', 'user_type', 'profile_picture', 'address_line1', 'city', 'state', 'pincode', 'groups', 'user_permissions')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        groups = validated_data.pop('groups', [])
        user_permissions = validated_data.pop('user_permissions', [])
        user = CustomUser.objects.create_user(**validated_data)
        user.groups.set(groups)
        user.user_permissions.set(user_permissions)
        return user
class BlogPostSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['title', 'image', 'category', 'summary', 'content', 'draft','author']