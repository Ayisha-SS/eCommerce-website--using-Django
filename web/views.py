from django.shortcuts import render,get_object_or_404,redirect,HttpResponse
from django.http import JsonResponse
from web.models import Product,SavedItem, Category

# def index(request):
#     recent = Product.objects.all()[:6]
#     picks = Product.objects.all()[6:12]
#     watches = Product.objects.all()[12:18]

#     context = {
#         "recents":recent,
#         "picks":picks,
#         "watches":watches
#     }

#     return render(request,"index.html",context=context)
def index(request):
    query = request.GET.get('q')
    if query:
        products = Product.objects.filter(name__icontains=query)
        recent, picks, watches = [], [], []  # Empty the sections if a query is made
    else:
        products = []
        recent = Product.objects.all()[:6]
        picks = Product.objects.all()[6:12]
        watches = Product.objects.all()[12:18]

    context = {
        "recents": recent,
        "picks": picks,
        "watches": watches,
        "products": products,
        "query": query,
    }

    return render(request, "index.html", context=context)

def details(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    categories = product.category.all()
    similar_products = Product.objects.filter(category__in=categories).exclude(id=product_id).distinct()[:6]

    context = {
        "product":product,
        "categories":categories,
        'similar_products': similar_products,
    }
    return render(request, 'productDetails.html',context=context)


# def save_product(request, product_id):
#     product = Product.objects.get(pk=product_id)
#     saved_item, created = SavedItem.objects.get_or_create(product=product)
#     if created:
#         # Optionally, add a message saying item is saved
#         pass
#     return redirect('index')  # Redirect to wherever you want after saving

def save_item(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    # Assuming you have a SavedItem model to store saved items
    SavedItem.objects.create(product=product, user=request.user)  # Adjust as per your models
    return HttpResponse(f"Item {product_id} saved successfully")

def remove_item(request, product_id):
    saved_item = get_object_or_404(SavedItem, product_id=product_id, user=request.user)
    saved_item.delete()
    return HttpResponse(status=200)


def fetch_items(request, slug):
    try:
        category = Category.objects.get(slug=slug)
        items = category.products.all()
        items_data = [
            {
                'id': item.id,
                'name': item.name,
                'price': str(item.price),
                'image_url': item.image.url if item.image else '',
            }
            for item in items
        ]
        return JsonResponse({'items': items_data})
    except Category.DoesNotExist:
        return JsonResponse({'items': []})
    

# def home(request):
#     query = request.GET.get('q')
#     if query:
#         products = Product.objects.filter(name__icontains=query)
#     else:
#         products = Product.objects.all()
#     return render(request, 'home.html', {'products': products, 'query': query})