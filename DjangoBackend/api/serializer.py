from .models import Event
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True,'required':True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        



class EventSerializer(serializers.ModelSerializer):
    publisher=UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'title','description','poster', 'date', 'time', 'location', 'regular_ticket', 'vip_ticket', 'max_attendance', 'created_at' , 'publisher')


