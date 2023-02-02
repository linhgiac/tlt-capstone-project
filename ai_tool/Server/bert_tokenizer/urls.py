from django.urls import path

from bert_tokenizer import views

urlpatterns = [
    path('tokenize/', views.Tokenize.as_view())
]
