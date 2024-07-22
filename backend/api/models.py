from django.db import models
from django.contrib.auth.models import User
# Create your models here.


# This is the model for our notes
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # this is automatically set when the object is first created not having us pass it in
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    # this is a foreign key that links the note to the user who created it
    # on_delete=models.CASCADE means that if the user is deleted then all the notes associated with that user will also be deleted
    # related_name="notes" is the name of the reverse relation from User to Note
    # this will allow us to access all the notes that a user has created
    # user.notes.all() will return all the notes that the user


    # this is a string representation of the model
    # the __str__ method is used to return a human-readable representation of the object
    def __str__(self):
        return self.title