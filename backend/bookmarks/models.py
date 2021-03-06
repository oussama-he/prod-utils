from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django_extensions.db.fields import AutoSlugField


class Category(MPTTModel):
    name = models.CharField(max_length=50, verbose_name='Category')
    slug = AutoSlugField(populate_from=["name"], unique=True)
    description = models.TextField(blank=True, null=True)
    parent = TreeForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name="children")

    class Meta:
        verbose_name_plural = 'Categories'
    
    class MPTTMeta:
        order_insertion_by = ['name']

    def __str__(self):
        return self.name


class Bookmark(models.Model):
    url = models.URLField(verbose_name="Bookmark URL", max_length=1000)
    title = models.CharField(max_length=250)
    slug = AutoSlugField(populate_from=["title"], unique=True)
    description = models.TextField(blank=True, null=True)
    category = TreeForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    bookmarked_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        ordering = ["-bookmarked_at", ]

    def __str__(self):
        return self.title
