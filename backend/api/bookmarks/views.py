from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    CreateAPIView,
    UpdateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import CategorySerializer, BookmarkSerializer
from .models import Category, Bookmark

import json

from ..utils.utils import get_page_title


class CategoryListAPIView(ListCreateAPIView):
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer


class CategoryAPIDetail(UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'


class BookmarkByCategoryAPIList(ListAPIView):
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        return Bookmark.objects.filter(category__name=category)


class BookmarkAPICreate(CreateAPIView):
    serializer_class = BookmarkSerializer


class BookmarkAPIDetail(RetrieveUpdateDestroyAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    lookup_field = 'id'


@api_view()
def get_page_title_view(request, url):
    print('url from view', url)
    page_title = get_page_title(url)
    return Response({'title': page_title})


@api_view()
def check_url_existing_view(request, url):
    url_existence = False
    queryset = Bookmark.objects.filter(url=url)
    if queryset.exists():
        url_existence = True
    return Response({'url_existence': url_existence})