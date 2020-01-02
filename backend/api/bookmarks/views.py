from rest_framework import viewsets
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import CategorySerializer, BookmarkListSerializer, BookmarkCreateSerializer
from .models import Category, Bookmark

import json

from ..utils.utils import get_page_title

class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer


class CategoryAPIView(APIView):

    def post(self, request):
        data = json.loads(request.body)
        parent = Category.objects.get(pk=data['parent'])
        Category.objects.create(
            name=data['label'],
            parent=parent,
            description=data['description']
        )
        # TODO: send the created instance to the front-end
        return Response()

    def put(self, request, id):
        data = json.loads(request.body)
        Category.objects.filter(pk=id).update(
            name=data['label'],
            parent=data['parent'],
            description=data['description']
        )
        return Response()


class BookmarkListAPIView(ListAPIView):
    serializer_class = BookmarkListSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        return Bookmark.objects.filter(category__name=category).order_by('-bookmarked_at')


class BookmarkCreateAPIView(CreateAPIView):
    serializer_class = BookmarkCreateSerializer


class BookmarkDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Bookmark.objects.get(pk=pk)
        except Bookmark.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        bookmark = self.get_object(id)
        return Response({
            'archived': bookmark.archived,
            'safe': bookmark.safe,
            'favorited': bookmark.favorited,
            'lastUpdate': bookmark.updated_at,
            'bookmarkedAt': bookmark.bookmarked_at,
            'title': bookmark.title,
            'url': bookmark.url,
            'description': bookmark.description,
            })

    def delete(self, request, id, format=None):
        bookmark = self.get_object(id)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id):
        data = json.loads(request.body)
        Bookmark.objects.filter(pk=id).update(
            title=data["title"],
            url=data["url"],
            category=data["category"],
            description=data["description"],
            safe=data["safe"],
            archived=data["archived"],
            favorited=data["favorited"]
        )
        return Response()

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