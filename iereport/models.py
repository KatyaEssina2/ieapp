from django.db import models
from authentication.models import CustomUser
from django.db.models import Sum
from django.db.models.functions import Coalesce


class Report(models.Model):
    month = models.DateField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reports')

    def __str__(self):
        return f'{self.user} - {self.month}'

    @property
    def rating(self):
        debt = 0
        income = 0
        report_items = self.items.all()
        for item in report_items:
            if item.item_type == "Debt":
                debt += item.amount
            elif item.item_type == "Income":
                income += item.amount
        return round(debt/income * 100) if income else 0

    @property
    def grade(self):
        if self.rating < 10:
            return "A"
        elif 10 <= self.rating < 30:
            return "B"
        elif 30 <= self.rating < 50:
            return "C"
        else:
            return "D"

    @property
    def disposable_income(self):
        money_out = self.items.filter(item_type__in=['Debt', 'Expenditure']).aggregate(sum=Coalesce(Sum('amount'), 0))
        money_in = self.items.filter(item_type='Income').aggregate(sum=Coalesce(Sum('amount'), 0))

        return round(money_in['sum'] - money_out['sum'])


class ReportItem(models.Model):
    item_type = models.CharField(CustomUser, max_length=25)
    description = models.CharField(CustomUser, max_length=255)
    amount = models.IntegerField()
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='items')

    def __str__(self):
        return f'{self.item_type} {self.description} - £{self.amount}'
