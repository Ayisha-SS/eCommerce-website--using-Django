from django.urls import path
from web.views import index,details
from . import views

app_name = 'web'


urlpatterns = [
    path('',index,name="index"),
    path('product/<int:product_id>/', views.details, name='details'), 
    # path('save-item/<int:product_id>/', views.save_item, name='save_item'),
# path('save-item/', views.save_product, name='save_item'),
    path('save-item/<int:product_id>/', views.save_item, name='save_item'),
    path('saved-items/', views.saved_items, name='saved_items'),
    path('category/<slug:slug>/', views.category_items, name='category_items'),
]
    # path('remove-item/<int:product_id>/', views.remove_item, name='remove_item'),
    # path('category/<slug:slug>/', views.fetch_items, name='fetch_items'),