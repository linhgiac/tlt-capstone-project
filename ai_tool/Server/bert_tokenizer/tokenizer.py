import transformers
from transformers import AutoTokenizer, AutoModelForTokenClassification, TrainingArguments, Trainer

from datasets import load_dataset, concatenate_datasets, load_metric
import pandas as pd
import numpy as np
import sys


def tokenize(tokenizer, input):
    tokenized_input = tokenizer(input, is_split_into_words=True)
    tokens = tokenizer.convert_ids_to_tokens(tokenized_input["input_ids"])
    return tokens


def main():
    argv = sys.argv
    script_name = argv[0]
    model_name = "bert-base-uncased"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    input = argv[1:]
    sequences = ' '.join(input)
    tokens = tokenize(tokenizer, sequences)
    print(tokens)


if __name__ == "main":
    main()
