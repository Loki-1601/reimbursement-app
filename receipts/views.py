# receipts/views.py
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Receipt  # ✅ ADD THIS
from .serializers import ReceiptSerializer


class ReceiptUploadView(CreateAPIView):
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer


    def post(self, request, format=None):
        serializer = ReceiptSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
