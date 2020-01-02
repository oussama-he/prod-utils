from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from .models import Category, Bookmark


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.ListSerializer(required=False, child=RecursiveField(),
                                               read_only=True)
    label = serializers.CharField(source='name')
    
    class Meta:
        model = Category
        fields = ['label', 'id', 'description', 'children', 'parent']


class BookmarkListSerializer(serializers.ModelSerializer):
    bookmarkedAt = serializers.DateTimeField(source="bookmarked_at")
    lastUpdate = serializers.DateTimeField(source="updated_at")

    class Meta:
        model = Bookmark
        fields = ['id', 'title', 'url', 'safe', 'favorited', 'archived', 'description', 'bookmarkedAt', 'lastUpdate']
        ordering = ['title']


class BookmarkCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookmark
        fields = ['title', 'url', 'description', 'category', 'safe']