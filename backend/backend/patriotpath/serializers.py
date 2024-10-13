from rest_framework import serializers
from .models import ResumeData

class ResumeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeData
        fields = ['id', 'file_name', 'file_type', 'sections', 'entries']

class ResumeUploadSerializer(serializers.Serializer):
    resume = serializers.FileField()

    def validate_resume(self, value):
        if not value.name.endswith(('.pdf', '.docx')):
            raise serializers.ValidationError("Only PDF and DOCX files are supported.")
        return value