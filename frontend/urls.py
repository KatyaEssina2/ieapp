from django.urls import path
from frontend.views import index
from django.conf.urls import url

urlpatterns = [
    path('', index),  # for the empty url
    url(r'^.*/$', index), # for all other urls
]
