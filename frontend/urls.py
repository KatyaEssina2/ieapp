from django.urls import path
from frontend.views import index
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', index),  # for the empty url
    url(r'^.*/$', index), # for all other urls
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)