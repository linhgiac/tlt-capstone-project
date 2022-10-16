from torchtext.vocab import build_vocab_from_iterator
import numpy as np
from constant import *
import torch


class DataLoader():
    def __init__(self, dataset):
        self.dataset = dataset
        train_iter = iter(self.dataset)
        self.vocab = build_vocab_from_iterator(
            self.yield_tokens(train_iter),
            max_tokens=VOCAB_SIZE,
            specials=[UNKNOWN_TOKEN]
        )
        self.vocab.set_default_index(self.vocab[UNKNOWN_TOKEN])

    def text_pipeline(self, text):
        one_hot = np.ones(MAX_SEQ_LEN, dtype=int) * \
            self.vocab.get_default_index()
        tokens = self.vocab(self.tokenizer(text))
        for i, token in enumerate(tokens):
            if(i >= MAX_SEQ_LEN):
                break
            one_hot[i] = token
        return one_hot

    def vectorize(self):
        result = []
        for text in self.dataset:
            result += [self.text_pipeline(text)]
        return torch.tensor(np.array(result), dtype=torch.long)

    def tokenizer(self, text):
        return text.split(' ')

    def yield_tokens(self, data_iter):
        for text in data_iter:
            yield self.tokenizer(text)

    def get_data(self):
        return self.vectorize(self.dataset)

    def vec_to_seq(self, vec):
        result = ""
        for token in vec:
            if(result != ""):
                result += " "
                result += self.vocab.lookup_token(token)
        return result
