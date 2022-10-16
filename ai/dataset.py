from torch.utils.data import Dataset
import glob
import io
import os
import re

class ImdbDataset(Dataset):
  def __init__(self, data_paths):
    for path in data_paths:
      examples = []
      for fname in glob.iglob(os.path.join(path,'*.txt')):
        with io.open(fname, 'r', encoding="utf-8") as f:
          text = f.readline()
          text = re.sub('([.,!?()])', r' \1 ', text)
          text = re.sub('\s{2,}', ' ', text)
          text = text.replace("<br />", "")
          sentences = text.split(" . ")
          sentences = ["<start> " + s + " <end>" for s in sentences]
          sentences = sentences[:-1]
        examples += sentences
    self.examples = examples

  def __len__(self):
    return len(self.examples)

  def __getitem__(self, idx):
    return self.examples[idx]

    