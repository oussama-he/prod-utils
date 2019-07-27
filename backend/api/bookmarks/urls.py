from django.urls import path
from .views import CategoryListAPIView, BookmarkCreateAPIView, get_page_title_view, BookmarkDetailAPIView, BookmarkListAPIView

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view()),
    path('bookmark/create/', BookmarkCreateAPIView.as_view()),
    path('get-page-title/<path:url>', get_page_title_view),
    path('bookmark/<int:id>/', BookmarkDetailAPIView.as_view()),
    path('<category>/', BookmarkListAPIView.as_view()),
]