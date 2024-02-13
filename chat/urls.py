from django.urls import path
from chat.views import create_message

urlpatterns = [
    path('api/messages/', create_message),

]