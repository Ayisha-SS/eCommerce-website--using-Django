from django.urls import path
from web.views import index,details
from . import views

app_name = 'web'


urlpatterns = [
    path('',index,name="index"),
    # path('details/',details,name="details")
    # path('details/', views.details, name='details'),
    path('product/<int:product_id>/', views.details, name='details'), 
    path('saved/', views.saved_items, name='saved_items'),
    path('category/<slug:slug>/', views.fetch_items, name='fetch_items'),
]