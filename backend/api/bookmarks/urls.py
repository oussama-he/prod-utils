from django.urls import path
from .views import CategoryListAPIView, CategoryAPIDetail, BookmarkCreateAPIView, get_page_title_view, BookmarkDetailAPIView, BookmarkListAPIView, check_url_existing_view

urlpatterns = [
    path('category/', CategoryListAPIView.as_view()),
    path('category/<int:id>/', CategoryAPIDetail.as_view(),),
    path('bookmark/create/', BookmarkCreateAPIView.as_view()),
    path('get-page-title/<path:url>', get_page_title_view),
    path('check-url-existence/<path:url>', check_url_existing_view,),
    path('bookmark/<int:id>/', BookmarkDetailAPIView.as_view()),
    path('<category>/', BookmarkListAPIView.as_view()),
]