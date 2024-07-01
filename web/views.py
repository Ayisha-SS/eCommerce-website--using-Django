from django.shortcuts import render,get_object_or_404
from web.models import Product

def index(request):
    products = Product.objects.all()[:6]

    context = {
        "products":products
    }

    return render(request,"index.html",context=context)


def details(request,pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'productDetails.html',{'product': product})