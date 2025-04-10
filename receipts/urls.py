from django.urls import path
from .views import ReceiptUploadView

urlpatterns = [
    path('submit/', ReceiptUploadView.as_view(), name='submit-receipt'),
]
