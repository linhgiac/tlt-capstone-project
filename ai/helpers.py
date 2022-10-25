import torch
from torch.autograd import Variable
from math import ceil
from const import *
import math
from tqdm import tqdm

# TODO: Done
class BatchDataIter(object):
    """ Toy data iter to load digits"""

    def __init__(self, batch_size, dataset):
        super(BatchDataIter, self).__init__()
        self.batch_size = batch_size
        self.data_lis = dataset
        self.set_len()
        self.idx = 0

    def set_len(self):
        self.data_num = self.data_lis.size(0)
        self.num_batches = int(math.floor(
            float(self.data_num)/self.batch_size))

    def __len__(self):
        return self.num_batches

    def __iter__(self):
        return self

    def __next__(self):
        return self.next()

    def next(self):
        if self.idx >= self.data_num - self.batch_size:
            raise StopIteration
        # index = self.indices[self.idx:self.idx+self.batch_size]
        data = self.data_lis[self.idx:self.idx+self.batch_size]
        self.idx += self.batch_size
        return data


class DisBatchDataIter(BatchDataIter):
    def set_len(self):
        self.data_num = self.data_lis[0].size(0)
        self.num_batches = int(math.floor(
            float(self.data_num)/self.batch_size))

    def next(self):
        if self.idx >= self.data_num - self.batch_size:
            raise StopIteration
        # index = self.indices[self.idx:self.idx+self.batch_size]
        inp_data, target_data = self.data_lis
        inp_data = inp_data[self.idx:self.idx+self.batch_size]
        target_data = target_data[self.idx:self.idx+self.batch_size]
        self.idx += self.batch_size
        return inp_data, target_data

def prepare_generator_batch(samples, input_length, gpu=False):
    """
    Takes samples (a batch) and returns

    Inputs: samples, start_letter, cuda
        - samples: batch_size x seq_len (Tensor with a sample in each row)

    Returns: inp, target
        - inp: batch_size x input_length 
        - target: batch_size x seq_len - 1 (offset forward by 1)
    """

    batch_size, seq_len = samples.size()

    inp = samples[:, :input_length]
    target = samples[:, 1:seq_len]

    inp = Variable(inp).type(torch.LongTensor)
    target = Variable(target).type(torch.LongTensor)

    if gpu:
        inp = inp.cuda()
        target = target.cuda()

    return inp, target

def generate_negative_data(generator, pos_inp):
    neg_val = [] 
    pos_inp_iter = BatchDataIter(BATCH_SIZE, pos_inp)
    for inp in tqdm(pos_inp_iter, mininterval=2, desc=' - Generate negative data: ', leave=True):
        out = generator.sample(inp[:,:INP_SEQ_LEN])
        neg_val.append(out)
    neg_val = torch.cat(neg_val, dim=0)
    return neg_val

# TODO: Done
def prepare_discriminator_data(pos_samples, neg_samples, gpu=False):
    """
    Takes positive (target) samples, negative (generator) samples and prepares inp and target data for discriminator.

    Inputs: pos_samples, neg_samples
        - pos_samples: pos_size x seq_len
        - neg_samples: neg_size x seq_len

    Returns: inp, target
        - inp: (pos_size + neg_size) x seq_len
        - target: pos_size + neg_size (boolean 1/0)
    """
    inp = torch.cat((pos_samples, neg_samples), 0).type(torch.LongTensor)
    target = torch.ones(pos_samples.size()[0] + neg_samples.size()[0])
    target[pos_samples.size()[0]:] = 0

    # shuffle
    perm = torch.randperm(target.size()[0])
    target = target[perm]
    inp = inp[perm]

    inp = Variable(inp)
    target = Variable(target)

    if gpu:
        inp = inp.cuda()
        target = target.cuda()

    return inp, target

