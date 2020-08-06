from django.urls import path
from .views import (
    CategoryListAPIView,
    CategoryAPIDetail,
    get_page_title_view,
    BookmarkByCategoryAPIList,
    BookmarkAPICreate,
    BookmarkAPIDetail,
    check_url_existing_view,
)

urlpatterns = [
    path('category/', CategoryListAPIView.as_view()),
    path('category/<slug:slug>/', CategoryAPIDetail.as_view(),),
    path('category/<slug:slug>/bookmarks/', BookmarkByCategoryAPIList.as_view()),
    path('bookmark/', BookmarkAPICreate.as_view()),
    path('bookmark/<slug:slug>/', BookmarkAPIDetail.as_view()),
    path('get-page-title/<path:url>', get_page_title_view),
    path('check-url-existence/<path:url>', check_url_existing_view,),
]