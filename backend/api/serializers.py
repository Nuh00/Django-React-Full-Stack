from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Note


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    


class Noteserializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"
        read_only_fields = ["author"]