from django.contrib import admin
from django.urls import path, include
from FarmDirect_api.views import ATCViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/atc/',
         ATCViewSet.as_view({'get': 'get_all'}), name='atc-get-all'),
    path('api/atc/<int:pk>/',
         ATCViewSet.as_view({'get': 'get_by_id'}), name='atc-get-by-id'),
    path('api/atc/<int:pk>/parents/',
         ATCViewSet.as_view({'get': 'get_parent_chain'}), name='atc-get-parents'),
]
