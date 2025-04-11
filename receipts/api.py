# receipts/api.py
from ninja import Router
from ninja_crud import viewsets
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    RetrieveModelView,
    UpdateModelView,
    DeleteModelView,
)
from .models import Receipt

router = Router()

class ReceiptViewSet(viewsets.ModelViewSet):
    model = Receipt

    create_view = CreateModelView()
    list_view = ListModelView()
    retrieve_view = RetrieveModelView()
    update_view = UpdateModelView()
    delete_view = DeleteModelView()

ReceiptViewSet.register_routes(router)
