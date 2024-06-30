from django.urls import path
from web.views import index,details

app_name = 'web'


urlpatterns = [
    path('',index,name="index"),
    path('details/',details,name="details")
]