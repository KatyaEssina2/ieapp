from django.contrib import admin
from django.urls import path, include

admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(('authentication.urls', 'authentication'), namespace='authentication')),
    path('api/reports/', include(('iereport.urls', 'iereport'), namespace='iereport')),
    path('', include(('frontend.urls', 'frontend'), namespace='frontend')),
]