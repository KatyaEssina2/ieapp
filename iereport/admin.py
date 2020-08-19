from django.contrib import admin
from .models import Report, ReportItem


class ReportAdmin(admin.ModelAdmin):
    model = Report


admin.site.register(Report, ReportAdmin)


class ReportItemAdmin(admin.ModelAdmin):
    model = ReportItem


admin.site.register(ReportItem, ReportItemAdmin)