from django.db import models
from django.contrib.auth import get_user_model

class ResumeData(models.Model):
    file_name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=10)
    sections = models.TextField()
    entries = models.TextField()

    def __str__(self):
        return self.file_name
    
class JobListing(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    link = models.URLField()
    source = models.CharField(max_length=50)
    career_type = models.CharField(max_length=200)  # Store the job title searched for
    created_at = models.DateTimeField(auto_now_add=True)

class UserPreferences(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    selected_career = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)