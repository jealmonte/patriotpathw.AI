from django.urls import path
from .views import clear_cache, get_top_jobs, scrape_jobs, upload_resume, get_resume_data, delete_all_resumes, get_resume_by_id, analyze_resume_view

urlpatterns = [
    path('upload-resume/', upload_resume, name='upload_resume'),
    path('resume-data/', get_resume_data, name='get_resume_data'),
    path('resume-data/<int:id>/', get_resume_by_id, name='get_resume_by_id'),
    path('resume-data/delete/', delete_all_resumes, name='delete_all_resumes'),
    path('analyze-resume/', analyze_resume_view, name='analyze_resume'),
    path('api/scrape-jobs/', scrape_jobs, name='scrape_jobs'),
    path('top-jobs/', get_top_jobs, name='get_top_jobs'),
    path('clear-cache/', clear_cache, name='clear_cache'),
]