from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from .models import Category, Bookmark


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.ListSerializer(required=False, child=RecursiveField(),
                                               read_only=True)
    label = serializers.CharField(source='name')
    
    class Meta:
        model = Category
        fields = ['label', 'id', 'slug', 'description', 'children', 'parent']


class BookmarkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookmark
        fields = "__all__"
