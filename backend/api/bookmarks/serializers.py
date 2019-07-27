from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from .models import Category, Bookmark


class CategorySerializer(serializers.ModelSerializer):
    subCategories = serializers.ListSerializer(source="children", required=False, child=RecursiveField(),
                                               read_only=True)

    class Meta:
        model = Category
        fields = ['name', 'id', 'subCategories']


class BookmarkListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookmark
        fields = ['id', 'title', 'url', 'safe', 'favorite', 'archived']
        ordering = ['title']


class BookmarkCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookmark
        fields = ['title', 'url', 'description', 'category', 'safe']