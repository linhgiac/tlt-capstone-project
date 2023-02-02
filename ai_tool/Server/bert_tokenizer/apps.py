from django.apps import AppConfig
from transformers import AutoTokenizer

class BertTokenizerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bert_tokenizer'
    model_name = "bert-base-uncased"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
