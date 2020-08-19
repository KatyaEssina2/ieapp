from django.urls import path
from .views import ReportCreate, AllReports

urlpatterns = [
    path('create/', ReportCreate.as_view(), name='create_report'),
    path('', AllReports.as_view(), name='get_reports'),
]
