from django import forms
from .models import Product, Specification

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'category', 'image', 'description', 'slug', 'stock']

class SpecificationForm(forms.ModelForm):
    class Meta:
        model = Specification
        fields = ['key', 'value']