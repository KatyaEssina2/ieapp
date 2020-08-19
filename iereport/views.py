from rest_framework import status
from .serializers import ReportSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Report


class ReportCreate(APIView):

    def post(self, request):
        serializer = ReportSerializer(data=request.data, context={'user_pk': request.user.pk})

        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllReports(APIView):

    def get(self, request):
        qs = Report.objects.filter(user=request.user)
        serializer = ReportSerializer(qs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

