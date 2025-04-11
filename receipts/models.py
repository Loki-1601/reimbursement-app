from django.db import models

class Receipt(models.Model):
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    receipt_file = models.FileField(upload_to='receipts/')
    submitted = models.BooleanField(default=True, blank=True, null=True)
    reiumbursed = models.BooleanField(default=True, blank=True, null=True)
