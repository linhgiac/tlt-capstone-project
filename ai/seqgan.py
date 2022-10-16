from __future__ import print_function
import imp
from math import ceil
import numpy as np
import sys
import pdb
import random

import torch
import torch.optim as optim
import torch.nn as nn

import generator
import discriminator
import helpers

from dataset import *
from dataloader import *
from constant import *


def train_generator_MLE(gen, gen_opt, real_data_samples, epochs):
    """
    Max Likelihood Pretraining for the generator
    """
    for epoch in range(epochs):
        print('epoch %d : ' % (epoch + 1), end='')
        sys.stdout.flush()
        total_loss = 0

        for i in range(0, POS_NEG_SAMPLES, BATCH_SIZE):
            inp, target = helpers.prepare_generator_batch(
                real_data_samples[i:i + BATCH_SIZE], gpu=CUDA)
            gen_opt.zero_grad()
            loss = gen.batchNLLLoss(inp, target)
            loss.backward()
            gen_opt.step()

            total_loss += loss.data.item()

            if (i / BATCH_SIZE) % ceil(
                    ceil(POS_NEG_SAMPLES / float(BATCH_SIZE)) / 10.) == 0:  # roughly every 10% of an epoch
                print('.', end='')
                sys.stdout.flush()

        # each loss in a batch is loss per sample
        total_loss = total_loss / \
            ceil(POS_NEG_SAMPLES / float(BATCH_SIZE)) / MAX_SEQ_LEN

        # sample from generator and compute oracle NLL
        # oracle_loss = helpers.batchwise_oracle_nll(
        #     gen, oracle, POS_NEG_SAMPLES, BATCH_SIZE, MAX_SEQ_LEN, gpu=CUDA)

        print(' average_train_NLL = %.4f' % (total_loss))


def train_generator_PG(gen, gen_opt, dis, real_data_samples, num_batches):
    """
    The generator is trained using policy gradients, using the reward from the discriminator.
    Training is done for num_batches batches.
    """

    for batch in range(num_batches):
        s = gen.sample(BATCH_SIZE*2)        # 64 works best
        inp, target = helpers.prepare_generator_batch(s, gpu=CUDA)
        rewards = dis.batchClassify(s)

        gen_opt.zero_grad()
        pg_loss = gen.batchPGLoss(inp, target, rewards)
        pg_loss.backward()
        gen_opt.step()

    # sample from generator and compute oracle NLL
    # oracle_loss = helpers.batchwise_oracle_nll(
    #     gen, oracle, POS_NEG_SAMPLES, BATCH_SIZE, MAX_SEQ_LEN, gpu=CUDA)

    # print(' oracle_sample_NLL = %.4f' % oracle_loss)
    total_loss = 0

    for i in range(0, POS_NEG_SAMPLES, BATCH_SIZE):
        inp, target = helpers.prepare_generator_batch(
            real_data_samples[i:i + BATCH_SIZE], gpu=CUDA)
        loss = gen.batchNLLLoss(inp, target)
        total_loss += loss.data.item()

    # each loss in a batch is loss per sample
    total_loss = total_loss / \
        ceil(POS_NEG_SAMPLES / float(BATCH_SIZE)) / MAX_SEQ_LEN

    # sample from generator and compute oracle NLL
    # oracle_loss = helpers.batchwise_oracle_nll(
    #     gen, oracle, POS_NEG_SAMPLES, BATCH_SIZE, MAX_SEQ_LEN, gpu=CUDA)

    print(' average_train_NLL = %.4f' % (total_loss))


def train_discriminator(discriminator, dis_opt, real_data_samples, generator, d_steps, epochs):
    """
    Training the discriminator on real_data_samples (positive) and generated samples from generator (negative).
    Samples are drawn d_steps times, and the discriminator is trained for epochs epochs.
    """

    # generating a small validation set before training (using oracle and generator)
    pos_val = random.sample(real_data_samples, 1000)
    neg_val = generator.sample(1000)
    val_inp, val_target = helpers.prepare_discriminator_data(
        pos_val, neg_val, gpu=CUDA)

    for d_step in range(d_steps):
        s = helpers.batchwise_sample(generator, POS_NEG_SAMPLES, BATCH_SIZE)
        dis_inp, dis_target = helpers.prepare_discriminator_data(
            real_data_samples, s, gpu=CUDA)
        for epoch in range(epochs):
            print('d-step %d epoch %d : ' % (d_step + 1, epoch + 1), end='')
            sys.stdout.flush()
            total_loss = 0
            total_acc = 0

            for i in range(0, 2 * POS_NEG_SAMPLES, BATCH_SIZE):
                inp, target = dis_inp[i:i +
                                      BATCH_SIZE], dis_target[i:i + BATCH_SIZE]
                dis_opt.zero_grad()
                out = discriminator.batchClassify(inp)
                loss_fn = nn.BCELoss()
                loss = loss_fn(out, target)
                loss.backward()
                dis_opt.step()

                total_loss += loss.data.item()
                total_acc += torch.sum((out > 0.5) ==
                                       (target > 0.5)).data.item()

                if (i / BATCH_SIZE) % ceil(ceil(2 * POS_NEG_SAMPLES / float(
                        BATCH_SIZE)) / 10.) == 0:  # roughly every 10% of an epoch
                    print('.', end='')
                    sys.stdout.flush()

            total_loss /= ceil(2 * POS_NEG_SAMPLES / float(BATCH_SIZE))
            total_acc /= float(2 * POS_NEG_SAMPLES)

            val_pred = discriminator.batchClassify(val_inp)
            print(' average_loss = %.4f, train_acc = %.4f, val_acc = %.4f' % (
                total_loss, total_acc, torch.sum((val_pred > 0.5) == (val_target > 0.5)).data.item()/200.))


# MAIN
if __name__ == '__main__':
    # oracle = generator.Generator(
    #     GEN_EMBEDDING_DIM, GEN_HIDDEN_DIM, VOCAB_SIZE, MAX_SEQ_LEN, gpu=CUDA)
    # oracle.load_state_dict(torch.load(oracle_state_dict_path))
    train_dataset = Dataset(data_path_train)
    test_dataset = Dataset(data_path_test)

    data_loader = DataLoader(train_dataset)
    oracle_samples = data_loader.vectorize()
    # a new oracle can be generated by passing oracle_init=True in the generator constructor
    # samples for the new oracle can be generated using helpers.batchwise_sample()

    gen = generator.Generator(
        GEN_EMBEDDING_DIM, GEN_HIDDEN_DIM, VOCAB_SIZE, MAX_SEQ_LEN, gpu=CUDA)
    dis = discriminator.Discriminator(
        DIS_EMBEDDING_DIM, DIS_HIDDEN_DIM, VOCAB_SIZE, MAX_SEQ_LEN, gpu=CUDA)

    if CUDA:
        gen = gen.cuda()
        dis = dis.cuda()
        oracle_samples = oracle_samples.cuda()

    # GENERATOR MLE TRAINING
    print('Starting Generator MLE Training...')
    gen_optimizer = optim.Adam(gen.parameters(), lr=1e-2)
    train_generator_MLE(gen, gen_optimizer, oracle_samples, MLE_TRAIN_EPOCHS)

    # torch.save(gen.state_dict(), pretrained_gen_path)
    # gen.load_state_dict(torch.load(pretrained_gen_path))

    # PRETRAIN DISCRIMINATOR
    print('\nStarting Discriminator Training...')
    dis_optimizer = optim.Adagrad(dis.parameters())
    train_discriminator(dis, dis_optimizer, oracle_samples,
                        gen, gen, PRETRAIN_DIS_EPOCHS, 3)

    # torch.save(dis.state_dict(), pretrained_dis_path)
    # dis.load_state_dict(torch.load(pretrained_dis_path))

    # ADVERSARIAL TRAINING
    print('\nStarting Adversarial Training...')
    # oracle_loss = helpers.batchwise_oracle_nll(
    #     gen, oracle, POS_NEG_SAMPLES, BATCH_SIZE, MAX_SEQ_LEN, gpu=CUDA)
    # print('\nInitial Oracle Sample Loss : %.4f' % oracle_loss)

    for epoch in range(ADV_TRAIN_EPOCHS):
        print('\n--------\nEPOCH %d\n--------' % (epoch+1))
        # TRAIN GENERATOR
        print('\nAdversarial Training Generator : ', end='')
        sys.stdout.flush()
        train_generator_PG(gen, gen_optimizer, dis, oracle_samples, 1)

        # TRAIN DISCRIMINATOR
        print('\nAdversarial Training Discriminator : ')
        train_discriminator(dis, dis_optimizer, oracle_samples, gen, 3, 1)
