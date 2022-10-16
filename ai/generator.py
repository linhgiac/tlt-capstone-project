import torch
import torch.autograd as autograd
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import pdb
import math
import torch.nn.init as init
from constant import *


class Generator(nn.Module):

    def __init__(self, embedding_dim, hidden_dim, vocab_size, max_seq_len, gpu=False, oracle_init=False):
        super(Generator, self).__init__()
        self.hidden_dim = hidden_dim
        self.embedding_dim = embedding_dim
        self.max_seq_len = max_seq_len
        self.vocab_size = vocab_size
        self.gpu = gpu

        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
        self.gru = nn.GRU(embedding_dim, hidden_dim)
        self.gru2out = nn.Linear(hidden_dim, vocab_size)

        # initialise oracle network with N(0,1)
        # otherwise variance of initialisation is very small => high NLL for data sampled from the same model
        if oracle_init:
            for p in self.parameters():
                init.normal(p, 0, 1)

    def init_hidden(self, batch_size=1):
        h = autograd.Variable(torch.zeros(1, batch_size, self.hidden_dim))

        if self.gpu:
            return h.cuda()
        else:
            return h

    def forward(self, inp, hidden):
        """
        Embeds input and applies GRU one token at a time (seq_len = 1)
        """
        # input dim                                             # batch_size
        # batch_size x embedding_dim
        emb = self.embeddings(inp)
        # 1 x batch_size x embedding_dim
        emb = emb.view(1, -1, self.embedding_dim)
        # 1 x batch_size x hidden_dim (out)
        out, hidden = self.gru(emb, hidden)
        # batch_size x vocab_size
        out = self.gru2out(out.view(-1, self.hidden_dim))
        out = F.log_softmax(out, dim=1)
        return out, hidden

    def sample(self, batch_size, x=None):
        res = []
        flag = False  # whether sample from zero
        if x is None:
            flag = True
        if flag:
            x = autograd.Variable(torch.zeros((batch_size, 1)).long())
        if CUDA:
            x = x.cuda()
        h = self.init_hidden(batch_size)
        samples = []
        if flag:
            for i in range(MAX_SEQ_LEN):
                output, h = self.forward(x, h)
                x = torch.multinomial(torch.exp(output), 1)
                samples.append(x)
        else:
            given_len = x.size(1)
            lis = x.chunk(x.size(1), dim=1)
            for i in range(given_len):
                output, h = self.forward(lis[i], h)
                samples.append(lis[i])
            x = torch.multinomial(torch.exp(output), 1)
            for i in range(given_len, MAX_SEQ_LEN):
                samples.append(x)
                output, h = self.forward(x, h)
                x = torch.multinomial(torch.exp(output), 1)
        output = torch.cat(samples, dim=1)
        print(output.size())
        return output

    def batchNLLLoss(self, inp, target):
        """
        Returns the NLL Loss for predicting target sequence.

        Inputs: inp, target
            - inp: batch_size x seq_len
            - target: batch_size x seq_len

            inp should be target with <s> (start letter) prepended
        """

        loss_fn = nn.NLLLoss()
        batch_size, seq_len = inp.size()
        inp = inp.permute(1, 0)           # seq_len x batch_size
        target = target.permute(1, 0)     # seq_len x batch_size
        h = self.init_hidden(batch_size)

        loss = 0
        for i in range(seq_len):
            out, h = self.forward(inp[i], h)
            loss += loss_fn(out, target[i])

        return loss     # per batch

    def batchPGLoss(self, inp, target, reward):
        """
        Returns a pseudo-loss that gives corresponding policy gradients (on calling .backward()).
        Inspired by the example in http://karpathy.github.io/2016/05/31/rl/

        Inputs: inp, target
            - inp: batch_size x seq_len
            - target: batch_size x seq_len
            - reward: batch_size (discriminator reward for each sentence, applied to each token of the corresponding
                      sentence)

            inp should be target with <s> (start letter) prepended
        """

        batch_size, seq_len = inp.size()
        inp = inp.permute(1, 0)          # seq_len x batch_size
        target = target.permute(1, 0)    # seq_len x batch_size
        h = self.init_hidden(batch_size)

        loss = 0
        for i in range(seq_len):
            out, h = self.forward(inp[i], h)
            # TODO: should h be detached from graph (.detach())?
            for j in range(batch_size):
                loss += -out[j][target.data[i][j]] * \
                    reward[j]     # log(P(y_t|Y_1:Y_{t-1})) * Q

        return loss/batch_size
