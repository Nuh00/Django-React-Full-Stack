from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import userSerializer, Noteserializer
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Note

# This class is used to create a new user
# the queryset gets all the users to make sure the user is not already in the database
# the serializer_class is the userSerializer class???
# the permission_classes is set to AllowAny so that anyone can create a user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
    permission_classes = [AllowAny]


# Create your views here.


 # Note view for creating and listing notes
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = Noteserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
    


# Note view for updating and deleting notes

class NoteDelete(generics.DestroyAPIView):
    serializer_class = Noteserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): # Makes sure you can only delete notes that you own
        user = self.request.user
        return Note.objects.filter(author=user) # returns all the notes that the user has created
    
    # def perform_destroy(self, instance):
    #     instance.delete()