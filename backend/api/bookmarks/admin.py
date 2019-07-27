from django.contrib import admin
from .models import Bookmark, Category
from mptt.admin import MPTTModelAdmin


admin.site.register(Bookmark)
admin.site.register(Category, MPTTModelAdmin)
