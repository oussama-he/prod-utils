from django.db import models
from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):
    name = models.CharField(max_length=50, verbose_name='Category')
    slug = models.SlugField()
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
    description = models.TextField(blank=True, null=True)
    category = TreeForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    bookmarked_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    safe = models.BooleanField(default=False)
    favorited = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    class Meta:
        ordering = ["bookmarked_at", ]

    def __str__(self):
        return self.title
