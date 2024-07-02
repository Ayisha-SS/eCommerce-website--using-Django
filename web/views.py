from django.shortcuts import render,get_object_or_404,redirect
from django.http import JsonResponse
from web.models import Product,SavedItem, Category

def index(request):
    recent = Product.objects.all()[:6]
    picks = Product.objects.all()[6:12]
    watches = Product.objects.all()[12:18]

    context = {
        "recents":recent,
        "picks":picks,
        "watches":watches
    }

    return render(request,"index.html",context=context)


def details(request, product_id):
    product = get_object_or_404(Product, id=product_id)

    context = {
        "product":product,
        "categories":product.category.all()
    }
    return render(request, 'productDetails.html',context=context)


# def save_product(request, product_id):
#     product = Product.objects.get(pk=product_id)
#     saved_item, created = SavedItem.objects.get_or_create(product=product)
#     if created:
#         # Optionally, add a message saying item is saved
#         pass
#     return redirect('index')  # Redirect to wherever you want after saving

def saved_items(request):
    saved_items = SavedItem.objects.all()  # Fetch all saved items
    context = {
        'saved_items': saved_items
    }
    return render(request, 'savedItems.html', context)


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