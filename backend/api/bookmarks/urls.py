from django.urls import path
from .views import CategoryListAPIView, CategoryAPIView, BookmarkCreateAPIView, get_page_title_view, BookmarkDetailAPIView, BookmarkListAPIView, check_url_existing_view

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view()),
    path('category/', CategoryAPIView.as_view()),
    path('categories/<int:id>/', CategoryAPIView.as_view(),),
    path('bookmark/create/', BookmarkCreateAPIView.as_view()),
    path('get-page-title/<path:url>', get_page_title_view),
    path('check-url-existence/<path:url>', check_url_existing_view,),
    path('bookmark/<int:id>/', BookmarkDetailAPIView.as_view()),
    path('<category>/', BookmarkListAPIView.as_view()),
]