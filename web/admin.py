from django.contrib import admin

from web.models import Product, Category, Gallery,SavedItem


class GalleryAdmin(admin.TabularInline):
    list_display = ["name","image"]
    model = Gallery
    # prepopulated_fields = {"slug": ("name",)}

class ProductAdmin(admin.ModelAdmin):
    list_display = ("name","price","image")
    prepopulated_fields = {"slug": ("name",)}

    inlines = [GalleryAdmin]

class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(Product,ProductAdmin)
admin.site.register(Category,CategoryAdmin)
admin.site.register(SavedItem)
