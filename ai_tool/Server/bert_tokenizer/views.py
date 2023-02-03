from django.shortcuts import render

# Create your views here.
from .apps import BertTokenizerConfig
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class Tokenize(APIView):
    def post(self, request, format=None):
        try:
            tokenized_input = BertTokenizerConfig.tokenizer(
                request.data['data'])
            tokens = BertTokenizerConfig.tokenizer.convert_ids_to_tokens(
                tokenized_input["input_ids"])
            print(tokens)
            return Response(data={'data': tokens}, status=status.HTTP_200_OK)
        except Exception as e:
            print("Error: ", e)
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        try:
            tokenized_input = BertTokenizerConfig.tokenizer(
                request.data['data'])
            tokens = BertTokenizerConfig.tokenizer.convert_ids_to_tokens(
                tokenized_input["input_ids"])
            print(tokens)
            return Response(data={'data': tokens}, status=status.HTTP_200_OK)
        except Exception as e:
            print("Error: ", e)
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
