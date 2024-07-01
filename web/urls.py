from django.urls import path
from web.views import index,details
from . import views

app_name = 'web'


urlpatterns = [
    path('',index,name="index"),
    # path('details/',details,name="details")
    path('details/<int:pk>', views.details, name='details'),
]