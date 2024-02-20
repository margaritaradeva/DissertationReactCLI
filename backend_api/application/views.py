from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework.permisssions import AllowAny
from rest_framework.responses import Response
from rest_framework.view import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
# Create your views here.

def get_auth_for_user(user):
    tokens = RefreshToken.for_user(user)
    return {
        'user': UserSerializer(user).data,
        'tokens'
    }


class SignInView(APIView):
    permission_classes = [AllowAny] # Allow anyone
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response(status=400)
        
        user = authenticate(username=username, password=password)
        if not user:
            return Response(status=401)
        user_data = get_auth_for_user(user)

        return Response(user_data)