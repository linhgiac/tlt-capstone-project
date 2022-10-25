import torch
import torch.autograd as autograd
import torch.nn as nn
import torch.nn.functional as F
import torch.nn.init as init
from const import *


class Generator(nn.Module):

    def __init__(self, embedding_dim, hidden_dim, vocab_size, max_seq_len, gpu=False):
        super(Generator, self).__init__()
        self.hidden_dim = hidden_dim
        self.embedding_dim = embedding_dim
        self.max_seq_len = max_seq_len
        self.vocab_size = vocab_size
        self.gpu = gpu

        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
        self.gru = nn.GRU(embedding_dim, hidden_dim)
        self.gru2out = nn.Linear(hidden_dim, vocab_size)

        for p in self.parameters():
            init.normal_(p, 0, 1)

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
        # TODO: Done
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

    
    # Not allow x = None <- Teacher forcing
    def sample(self, x):
        # TODO: Done

        samples = []
        
        batch_size, given_len = x.size() # x : batch_size x input_length

        x = x.permute(1, 0) # -> input_length x batch_size
                            # -> x[i] <-> token_i for each seq in current batch

        h = self.init_hidden(batch_size)

        # x_0, x_1, ..., x_I-1
        for i in range(given_len):
            output, h = self.forward(x[i], h)
            samples.append(x[i].view(-1, 1))                

        # x_I
        x = torch.multinomial(torch.exp(output), 1)
        samples.append(x)

        # x_I+1, x_I+2, ..., x_N-1
        for i in range(given_len + 1, self.max_seq_len):
            output, h = self.forward(x, h)
            x = torch.multinomial(torch.exp(output), 1)
            samples.append(x)
        
        output = torch.cat(samples, dim=1) # max_seq_len x batch_size
        # output = output.permute(1, 0)
        # print("Output size: ", output.size()) # -> must be batch_size x max_seq_len
        return output

    def batchNLLLoss(self, inp, target):
        """
        Returns the NLL Loss for predicting target sequence.

        Inputs: inp, target
            - inp: batch_size x input_length
            - target: batch_size x max_seq_len - 1
        """
        # TODO: Convert seq_len -> input_length, max_seq_len => DONE

        loss_fn = nn.NLLLoss()
        batch_size, seq_len = inp.size()
        inp = inp.permute(1, 0)           # seq_len x batch_size
        target = target.permute(1, 0)     # seq_len x batch_size
        h = self.init_hidden(batch_size)

        loss = 0
        input = inp[0]
        for i in range(self.max_seq_len - 1):
            out, h = self.forward(input, h)
            loss += loss_fn(out, target[i])
            if (i+1 >= seq_len):
                input = torch.multinomial(torch.exp(out), 1)
            else:
                input = inp[i+1]

        return loss     # per batch

    def batchPGLoss(self, inp, target, reward):
        """
        Returns a pseudo-loss that gives corresponding policy gradients (on calling .backward()).
        Inspired by the example in http://karpathy.github.io/2016/05/31/rl/

        Inputs: inp, target
            - inp: batch_size x input length
            - target: batch_size x seq_len - 1
            - reward: batch_size (discriminator reward for each sentence, applied to each token of the corresponding
                      sentence)
        """
        # TODO: Convert seq_len -> input_length, max_seq_len => DONE

        batch_size, seq_len = inp.size()
        inp = inp.permute(1, 0)          # seq_len x batch_size
        target = target.permute(1, 0)    # seq_len x batch_size
        h = self.init_hidden(batch_size)

        loss = 0
        input = inp[0]
        for i in range(self.max_seq_len - 1):
            out, h = self.forward(input, h)
            # TODO: should h be detached from graph (.detach())?
            # if (i+1 >= seq_len): -> only calculate loss for new token ?
            for j in range(batch_size):
                loss += -out[j][target.data[i][j]] * reward[j]
                # log(P(y_t|Y_1:Y_{t-1})) * Q
            if (i+1 >= seq_len):
                input = torch.multinomial(torch.exp(out), 1)
            else:
                input = inp[i+1]

        return loss/batch_size
