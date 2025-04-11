from ninja import NinjaAPI, Form, File
from ninja.files import UploadedFile
from datetime import date
from typing import List, Optional
from decimal import Decimal
from pydantic import BaseModel, ConfigDict, field_validator
from django.db.models.fields.files import FieldFile
from .models import Receipt

api = NinjaAPI()

class ReceiptOut(BaseModel):
    id: int
    date: date
    amount: Decimal
    description: str
    receipt_file: Optional[str] = None
    submitted: bool = True
    reimbursed: bool = False

    model_config = ConfigDict(
         from_attributes=True,
         json_encoders={Decimal: lambda d: float(d)}
    )

    @field_validator("receipt_file", mode="before")
    def validate_receipt_file(cls, value):
        if isinstance(value, FieldFile):
            if not value.name:
                return None
            return value.url if hasattr(value, "url") and value.url else str(value)
        return value

    @field_validator("submitted", mode="before")
    def validate_submitted(cls, v):
        return v if v is not None else True

    @field_validator("reimbursed", mode="before")
    def validate_reimbursed(cls, v):
        return v if v is not None else False

@api.post("/receipts", response={201: ReceiptOut})
def create_receipt(
    request,
    date: date = Form(...),
    amount: str = Form(...),  
    description: str = Form(...),
    receipt_file: UploadedFile = File(None)  
    from decimal import Decimal, InvalidOperation
    try:
        valid_amount = Decimal(amount)
    except InvalidOperation:
        raise Exception("Invalid amount provided.")
    
    receipt = Receipt.objects.create(
        date=date,
        amount=valid_amount,
        description=description
    )
    if receipt_file:
        receipt.receipt_file.save(receipt_file.name, receipt_file)
    receipt.save()
    return 201, ReceiptOut.from_orm(receipt)

@api.get("/receipts", response=List[ReceiptOut])
def list_receipts(request):
    qs = Receipt.objects.all().order_by("-date")
    return [ReceiptOut.from_orm(r) for r in qs]

@api.get("/receipts/{receipt_id}", response=ReceiptOut)
def retrieve_receipt(request, receipt_id: int):
    receipt = Receipt.objects.get(pk=receipt_id)
    return ReceiptOut.from_orm(receipt)

@api.put("/receipts/{receipt_id}", response=ReceiptOut)
def update_receipt(
    request,
    receipt_id: int,
    date: date = Form(...),
    amount: str = Form(...),
    description: str = Form(...)
):
    from decimal import Decimal, InvalidOperation
    try:
        valid_amount = Decimal(amount)
    except InvalidOperation:
        raise Exception("Invalid amount provided.")

    receipt = Receipt.objects.get(pk=receipt_id)
    receipt.date = date
    receipt.amount = valid_amount
    receipt.description = description
    receipt.save()
    return ReceiptOut.from_orm(receipt)

@api.delete("/receipts/{receipt_id}")
def delete_receipt(request, receipt_id: int):
    Receipt.objects.filter(pk=receipt_id).delete()
    return {"success": True}
