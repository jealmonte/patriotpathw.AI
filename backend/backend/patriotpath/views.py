from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import ResumeUploadSerializer, ResumeDataSerializer
from .resume_analyzer import analyze_resume
import mimetypes
from pdfminer.high_level import extract_text
from pdfminer.layout import LAParams, LTTextBoxHorizontal
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
import docx
import tempfile
from .models import ResumeData
import json
from django.http import JsonResponse

def parse_pdf(file_path):
    output = {'sections': [], 'entries': []}
    resource_manager = PDFResourceManager()
    laparams = LAParams()
    device = PDFPageAggregator(resource_manager, laparams=laparams)
    interpreter = PDFPageInterpreter(resource_manager, device)

    with open(file_path, 'rb') as file:
        for page in PDFPage.get_pages(file):
            interpreter.process_page(page)
            layout = device.get_result()
            for element in layout:
                if isinstance(element, LTTextBoxHorizontal):
                    text = element.get_text().strip()
                    output['entries'].append({'text': text, 'bbox': element.bbox})
                    if 'Experience' in text:
                        output['sections'].append({'name': 'Experience', 'content': text})
                    elif 'Education' in text:
                        output['sections'].append({'name': 'Education', 'content': text})

    return output

def parse_docx(file_path):
    output = {'sections': [], 'entries': []}
    doc = docx.Document(file_path)

    current_section = None
    for para in doc.paragraphs:
        text = para.text.strip()
        style_name = para.style.name

        if style_name.startswith('Heading'):
            current_section = {'name': text, 'content': []}
            output['sections'].append(current_section)
        elif current_section:
            current_section['content'].append(text)

        entry_data = {
            'text': text,
            'style': style_name,
            'font_size': para.runs[0].font.size.pt if para.runs[0].font.size else None,
            'bold': para.runs[0].bold,
            'italic': para.runs[0].italic,
        }
        output['entries'].append(entry_data)

    return output

def extract_text_from_file(file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=file.name) as tmp:
        for chunk in file.chunks():
            tmp.write(chunk)
        tmp.flush()

        if file.name.endswith('.pdf'):
            return parse_pdf(tmp.name)
        
        elif file.name.endswith('.docx'):
            return parse_docx(tmp.name)
        
        else:
            return {'error': 'Unsupported file type'}

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_resume(request):
    serializer = ResumeUploadSerializer(data=request.data)
    if serializer.is_valid():
        resume_file = serializer.validated_data['resume']
        try:
            extracted_data = extract_text_from_file(resume_file)
            if 'error' in extracted_data:
                return Response({'error': extracted_data['error']}, status=status.HTTP_400_BAD_REQUEST)
            
            # Save the extracted data to the database
            resume_data = ResumeData(
                file_name=resume_file.name,
                file_type='pdf' if resume_file.name.endswith('.pdf') else 'docx',
                sections=json.dumps(extracted_data['sections']),
                entries=json.dumps(extracted_data['entries']),
            )
            resume_data.save()
            
            # Return the saved data
            return Response({
                'resume_data': {
                    'id': resume_data.id,
                    'file_name': resume_data.file_name,
                    'file_type': resume_data.file_type,
                    'sections': json.loads(resume_data.sections),
                    'entries': json.loads(resume_data.entries),
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_resume_data(request):
    # Query all resume data from the database
    resume_data = ResumeData.objects.all()
    
    # Convert queryset to a list of dictionaries
    data = list(resume_data.values('file_name', 'file_type', 'sections', 'entries'))
    
    # Return the data as a JSON response
    return JsonResponse({'resume_data': data})

@api_view(['DELETE'])
def delete_all_resumes(request):
    ResumeData.objects.all().delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_resume_by_id(request, id):
    try:
        resume_data = ResumeData.objects.get(id=id)
        return JsonResponse({
            'resume_data': {
                'file_name': resume_data.file_name,
                'file_type': resume_data.file_type,
                'sections': json.loads(resume_data.sections),
                'entries': json.loads(resume_data.entries),
            }
        })
    except ResumeData.DoesNotExist:
        return Response({'error': 'Resume not found.'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def analyze_resume_view(request):
    resume_data = request.data

    if 'sections' in resume_data and 'entries' in resume_data:
        # Call the analyze_resume function with the provided resume data
        analysis_result = analyze_resume(resume_data)  # This should return the structured feedback
        return Response(analysis_result, status=status.HTTP_200_OK)
    
    return Response({'error': 'Invalid resume data provided.'}, status=status.HTTP_400_BAD_REQUEST)