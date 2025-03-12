from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ATC
from .serializers import ATCSerializer


class ATCViewSet(viewsets.ViewSet):

    def get_all(self, request):
        """Получение всех записей ATC"""
        atcs = ATC.objects.all()
        serializer = ATCSerializer(atcs, many=True)
        return Response(serializer.data)

    def get_by_id(self, request, pk=None):
        """Получение записи ATC по id и всех дочерних категорий"""
        try:
            # Получаем родительскую категорию по ID
            atc = ATC.objects.get(pk=pk)

            # Получаем все дочерние категории, где родитель = текущая категория
            child_atcs = ATC.objects.filter(parent_id=atc)

            # Сериализация родительской и дочерних категорий
            parent_serializer = ATCSerializer(atc)
            children_serializer = ATCSerializer(child_atcs, many=True)

            # Возвращаем данные родительской категории и дочерних категорий
            return Response({
                "parent": parent_serializer.data,
                "children": children_serializer.data
            })
        except ATC.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    def get_parent_chain(self, request, pk=None):
        """Получение всех родительских категорий для записи ATC по id"""
        try:
            # Получаем запись по id
            atc = ATC.objects.get(pk=pk)
            
            # Ищем цепочку родительских категорий
            parent_chain = []
            while atc.parent is not None:
                parent_chain.append(ATCSerializer(atc.parent).data)
                atc = atc.parent

            # Возвращаем цепочку родительских категорий
            return Response({
                "parent_chain": parent_chain
            })
        except ATC.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
