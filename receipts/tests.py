from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from decimal import Decimal, InvalidOperation
from ninja.testing import TestClient
from receipts.models import Receipt
from receipts.api import api

client = TestClient(api)


class ReceiptAPITests(TestCase):
    def test_create_receipt_success(self):
        """
        Test creating a receipt with a valid file upload.
        """
        temp_file = SimpleUploadedFile(
            "test.pdf", b"dummy content", content_type="application/pdf"
        )
        data = {
            "date": "2025-04-10",
            "amount": "45.00",
            "description": "Test Receipt Creation"
        }
        files = {"receipt_file": temp_file}
        response = client.post("/receipts", data=data, files=files)
        self.assertEqual(response.status_code, 201)
        
        result = response.json()
        self.assertEqual(result["description"], "Test Receipt Creation")
        self.assertIn("receipt_file", result)
        self.assertTrue(result["receipt_file"].startswith("/media/receipts/"))

    def test_list_receipts(self):
        """
        Test that listing receipts returns at least one receipt.
        """
        receipt = Receipt.objects.create(
            date="2025-04-10",
            amount=Decimal("45.00"),
            description="List Test Receipt"
        )
        response = client.get("/receipts")
        self.assertEqual(response.status_code, 200)
        results = response.json()
        self.assertGreaterEqual(len(results), 1)
        found = any(r["description"] == "List Test Receipt" for r in results)
        self.assertTrue(found)

    def test_retrieve_receipt(self):
        """
        Test retrieving a single receipt by its ID.
        """
        receipt = Receipt.objects.create(
            date="2025-04-11",
            amount=Decimal("67.89"),
            description="Retrieve Test Receipt"
        )
        response = client.get(f"/receipts/{receipt.id}")
        self.assertEqual(response.status_code, 200)
        result = response.json()
        self.assertEqual(result["id"], receipt.id)
        self.assertEqual(result["description"], "Retrieve Test Receipt")

    def test_update_receipt(self):
        """
        Test updating an existing receipt.
        """
        receipt = Receipt.objects.create(
            date="2025-04-12",
            amount=Decimal("100.00"),
            description="Old Description"
        )
        update_data = {
            "date": "2025-04-13",
            "amount": "150.50",
            "description": "Updated Description"
        }
        response = client.put(f"/receipts/{receipt.id}", data=update_data)
        self.assertEqual(response.status_code, 200)
        result = response.json()
        self.assertEqual(result["description"], "Updated Description")
        self.assertEqual(result["amount"], 150.5)
        self.assertIn("2025-04-13", result["date"])

    def test_delete_receipt(self):
        """
        Test deleting a receipt.
        """
        receipt = Receipt.objects.create(
            date="2025-04-14",
            amount=Decimal("75.00"),
            description="Delete Test Receipt"
        )
        response = client.delete(f"/receipts/{receipt.id}")
        self.assertEqual(response.status_code, 200)
        response = client.get("/receipts")
        results = response.json()
        found = any(r["id"] == receipt.id for r in results)
        self.assertFalse(found)

    def test_invalid_amount(self):
        """
        Test that creating a receipt with an invalid amount raises an error.
        """
        temp_file = SimpleUploadedFile(
            "test.pdf", b"dummy content", content_type="application/pdf"
        )
        data = {
            "date": "2025-04-10",
            "amount": "invalid", 
            "description": "Invalid Amount Receipt"
        }
        files = {"receipt_file": temp_file}
        with self.assertRaises(Exception) as context:
            client.post("/receipts", data=data, files=files)
        self.assertIn("Invalid amount provided", str(context.exception))
