from torchtext.vocab import build_vocab_from_iterator
import numpy as np
from const import *
import torch

from torch.utils.data import Dataset
import glob
import io
import os
import re

# TODO: Split sentences from paragraph
class ImdbDataset(Dataset):
    def __init__(self, data_paths):
        examples = []
        for path in data_paths:
            index = 0
            for fname in glob.iglob(os.path.join(path,'*.txt')):
                with io.open(fname, 'r', encoding="utf-8") as f:
                    text = f.readline()
                    text = re.sub('([.,!?()])', r' \1 ', text)
                    text = re.sub('\s{2,}', ' ', text)
                    text = text.replace("<br />", "")
                    if(len(re.split(' ', text)) > MAX_TEXT_LEN or len(re.split(' ', text)) < MIN_TEXT_LEN):
                        continue
                    # with io.open("__data__/" + str(index) + ".txt", 'w', encoding="utf-8") as file:
                    #     file.writelines(text)
                index += 1
                examples += [text]
        self.examples = examples

    def __len__(self):
        return len(self.examples)

    def __getitem__(self, idx):
        return self.examples[idx]


# TODO: Split sentences from paragraph
class ProfessionalSummaryDataset(Dataset):
    def __init__(self, data_paths):
        examples = []
        index = 0

        for path in data_paths:
            for fname in glob.iglob(os.path.join(path, '*.txt')):
                with io.open(fname, 'r', encoding="utf-8") as f:
                    text = f.readline()
                    sentences = text.split(". ")
                    final_sentences = []
                    for s in sentences:
                        if(s[-1] == '.'):
                            s = s[:-1]
                        s = re.sub('([,;])', r' \1 ', s)
                        if(len(re.split(' ', s)) > MAX_TEXT_LEN or len(re.split(' ', s)) < MIN_TEXT_LEN):
                            continue
                        else:
                            final_sentences += [s]
                        with io.open("__data__/" + str(index) + ".txt", 'w', encoding="utf-8") as file:
                            file.writelines(s)
                            index += 1
                    examples += final_sentences
        self.examples = examples
        # print("Data len: " + str(len(self)))

    def __len__(self):
        return len(self.examples)

    def __getitem__(self, idx):
        return self.examples[idx]

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
        one_hot = np.ones(MAX_SEQ_LEN, dtype=int) * self.vocab.get_default_index()
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
        split = text.split(' ')
        while("" in split):
            split.remove("")
        return split

    def yield_tokens(self, data_iter):
        for text in data_iter:
            yield self.tokenizer(text)

    def get_data(self):
        return self.vectorize()

    def vec_to_seq(self, vec):
        result = ""
        for token in vec:
            if(result != ""):
                result += " "
            result += self.vocab.lookup_token(token)
        return result
