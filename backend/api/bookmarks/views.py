from rest_framework import viewsets
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import CategorySerializer, BookmarkListSerializer, BookmarkCreateSerializer
from .models import Category, Bookmark

from .utils import get_page_title


class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer


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


    def delete(self, request, id, format=None):
        bookmark = self.get_object(id)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view()
def get_page_title_view(request, url):
    print('url from view', url)
    page_title = get_page_title(url)
    return Response({'title': page_title})

