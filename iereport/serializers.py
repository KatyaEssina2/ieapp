from .models import ReportItem, Report
from rest_framework import serializers
from authentication.models import CustomUser


class ReportItemSerializer(serializers.ModelSerializer):
    item_type = serializers.CharField(required=True, max_length=20)
    description = serializers.CharField(required=True, max_length=255)
    amount = serializers.IntegerField(required=True)

    class Meta:
        model = ReportItem
        fields = ('item_type', 'description', 'amount')

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        return instance.save()


class ReportSerializer(serializers.ModelSerializer):
    month = serializers.DateField(required=True)
    items = ReportItemSerializer(many=True)
    rating = serializers.IntegerField(required=False)
    grade = serializers.CharField(required=False)
    disposable_income = serializers.DecimalField(decimal_places=2, max_digits=16, required=False)

    class Meta:
        model = Report
        fields = ('month', 'items', 'grade', 'rating', 'disposable_income')

    def create(self, validated_data):
        item_data = validated_data.pop('items')
        user = CustomUser.objects.get(pk=self.context.get('user_pk'))
        report = Report.objects.create(user=user, **validated_data)
        for item in item_data:
            ReportItem.objects.create(report=report, **item)
        return report


