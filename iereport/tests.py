from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from authentication.models import CustomUser
from iereport.models import Report, ReportItem
from datetime import datetime


class TestReports(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create(
            username="katya",
            password="12345678",
            first_name="Katya",
            last_name="Essina",
        )
        self.client.force_authenticate(user=self.user)
        self.report_data = {
            "month": "2019-01-01",
            "items": [
                {
                    "item_type": "Income",
                    "description": "A Description",
                    "amount": "200",
                },
                {
                    "item_type": "Income",
                    "description": "A Description",
                    "amount": "500",
                },
                {
                    "item_type": "Expenditure",
                    "description": "Another Description",
                    "amount": "500",
                },
                {
                    "item_type": "Debt",
                    "description": "A Third Description",
                    "amount": "1000",
                },
            ],
        }

    def test_create(self):
        report_count = Report.objects.count()
        item_count = ReportItem.objects.count()
        response = self.client.post(
            reverse("iereport:create_report"), self.report_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Report.objects.count(), report_count + 1)
        self.assertEqual(ReportItem.objects.count(), item_count + 4)

    def test_create_no_data(self):
        response = self.client.post(
            reverse("iereport:create_report"), {}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_no_items(self):
        # all data validation is done in the front end
        # test missing item logic only
        report_count = Report.objects.count()
        response = self.client.post(
            reverse("iereport:create_report"),
            {"month": "2020-11-27", "items": []},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Report.objects.count(), report_count)
        self.assertEqual(
            response.data[0], "Please add a report item or discard the report."
        )

    def test_disposable_income_calc(self):
        self.client.post(
            reverse("iereport:create_report"),
            self.report_data,
            format="json",
        )
        expected_disposable_income = 200 + 500 - 500 - 1000
        created_report = Report.objects.filter(month=datetime(2019, 1, 1)).first()
        self.assertEqual(created_report.disposable_income, expected_disposable_income)

    def test_rating_calc(self):
        self.client.post(
            reverse("iereport:create_report"),
            self.report_data,
            format="json",
        )
        # rating = (debt / income) * 100
        expected_rating = round((1000 / (200 + 500)) * 100)
        # rating < 10: A, 10 <= rating < 30: B, 30 <= rating < 50: C, rating >= 50: D
        expected_grade = "D"
        created_report = Report.objects.filter(month=datetime(2019, 1, 1)).first()
        self.assertEqual(created_report.rating, expected_rating)
        self.assertEqual(created_report.grade, expected_grade)

    def test_get_all(self):
        # test that a newly created report is returned as part of the request
        self.client.post(
            reverse("iereport:create_report"),
            self.report_data,
            format="json",
        )

        response = self.client.get(reverse("iereport:get_reports"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(
            any(report["month"] == "2019-01-01" for report in response.data)
        )
