from django.db import models

class ResumeData(models.Model):
    file_name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=10)
    sections = models.TextField()
    entries = models.TextField()

    def __str__(self):
        return self.file_name