from __future__ import print_function
from math import ceil, floor
import numpy as np
import sys
import random
from tqdm import tqdm
import torch
import torch.optim as optim
import torch.nn as nn

import generator
import discriminator
import helpers

from dataloader import *
from const import *

# TODO: DONE
def train_generator_MLE(gen, gen_opt, real_data_samples, epochs):
    """
    Max Likelihood Pretraining for the generator
    """
    for epoch in range(epochs):
        print('epoch %d : ' % (epoch + 1), end='')
        sys.stdout.flush()
        total_loss = 0

        real_data_iter = helpers.BatchDataIter(BATCH_SIZE, real_data_samples)
        for input_samples in tqdm(real_data_iter, mininterval=2, desc=' - Train Generator MLE: ', leave=True):
            inp, target = helpers.prepare_generator_batch(input_samples, INP_SEQ_LEN, gpu=CUDA)
            gen_opt.zero_grad()
            loss = gen.batchNLLLoss(inp, target)
            loss.backward()
            gen_opt.step()

            total_loss += loss.data.item()

        # each loss in a batch is loss per sample
        total_loss = total_loss / len(real_data_iter) / MAX_SEQ_LEN

        print(' average_train_NLL = %.4f' % (total_loss))

# TODO: input with input length DONE
def train_generator_PG(gen, gen_opt, dis, real_data_samples, steps):
    """
    The generator is trained using policy gradients, using the reward from the discriminator.
    Training is done for num_batches batches.
    """
    for i in range(steps):
        print('g-step %d: ' % (i + 1))
        total_reward = 0
        average_reward = 0
        correct_percent = 0
        real_data_iter = helpers.BatchDataIter(BATCH_SIZE, real_data_samples)
        for input_samples in tqdm(real_data_iter, mininterval=2, desc=' - Train Generator PG: ', leave=True):
            samples = gen.sample(input_samples[:, :INP_SEQ_LEN])        
            inp, target = helpers.prepare_generator_batch(samples, INP_SEQ_LEN, gpu=CUDA)
            rewards = dis.batchClassify(samples)
            total_reward += torch.sum(rewards)
            average_reward += torch.sum(rewards)/BATCH_SIZE

            gen_opt.zero_grad()
            pg_loss = gen.batchPGLoss(inp, target, rewards)
            pg_loss.backward()
            gen_opt.step()

        total_loss = 0

        real_data_iter = helpers.BatchDataIter(BATCH_SIZE, real_data_samples)
        for input_samples in tqdm(real_data_iter, mininterval=2, desc=' - Calculate NLL Loss: ', leave=True):
            inp, target = helpers.prepare_generator_batch(input_samples, INP_SEQ_LEN, gpu=CUDA)
            loss = gen.batchNLLLoss(inp, target)
            total_loss += loss.data.item()

        # each loss in a batch is loss per sample
        total_loss = total_loss / len(real_data_iter) / MAX_SEQ_LEN

        print('total reward = %.4f, average reward = %.4f, average_train_NLL = %.4f' 
                        % (total_reward, average_reward, total_loss))


def train_discriminator(discriminator, dis_opt, real_data_samples, generator, d_steps, epochs):
    """
    Training the discriminator on real_data_samples (positive) and generated samples from generator (negative).
    Samples are drawn d_steps times, and the discriminator is trained for epochs epochs.
    """

    # generating a small validation set before training (using oracle and generator)
    print(" --- Generate validation data")
    pos_val = test_data_samples
    neg_val = helpers.generate_negative_data(generator, pos_val)

    val_inp, val_target = helpers.prepare_discriminator_data(
        pos_val, neg_val, gpu=CUDA)

    for d_step in range(d_steps):
        print(" --- Generate training data")
        generated_data = helpers.generate_negative_data(generator, real_data_samples)
        dis_inp, dis_target = helpers.prepare_discriminator_data(
            real_data_samples, generated_data, gpu=CUDA)
        dis_data_iter = helpers.DisBatchDataIter(BATCH_SIZE, (dis_inp, dis_target))
        for epoch in range(epochs):
            print('d-step %d epoch %d : ' % (d_step + 1, epoch + 1))
            total_loss = 0
            total_acc = 0

            for inp, target in tqdm(dis_data_iter, mininterval=2, desc=' - Train Discriminator: ', leave=True):
                dis_opt.zero_grad()
                out = discriminator.batchClassify(inp)
                loss_fn = nn.BCELoss()
                loss = loss_fn(out, target)
                loss.backward()
                dis_opt.step()

                total_loss += loss.data.item()
                total_acc += torch.sum((out > 0.5) ==
                                       (target > 0.5)).data.item()

            total_loss /= float(len(dis_data_iter))
            total_acc /= float(len(dis_data_iter) * float(BATCH_SIZE))

            val_pred = discriminator.batchClassify(val_inp)
            print(' average_loss = %.4f, train_acc = %.4f, val_acc = %.4f' % (
                total_loss, total_acc, torch.sum((val_pred > 0.5) == (val_target > 0.5)).data.item()/200.))


# MAIN
if __name__ == '__main__':
    # oracle = generator.Generator(
    #     GEN_EMBEDDING_DIM, GEN_HIDDEN_DIM, VOCAB_SIZE, MAX_SEQ_LEN, gpu=CUDA)
    # oracle.load_state_dict(torch.load(oracle_state_dict_path))
    train_dataset = ProfessionalSummaryDataset(data_path_train)
    print("Train file: ", len(train_dataset))
    test_dataset = ProfessionalSummaryDataset(data_path_test)
    print("Test file: ", len(test_dataset))
    data_loader = DataLoader(train_dataset)
    test_loader = DataLoader(test_dataset)
    test_loader.vocab = data_loader.vocab
    real_data_samples = data_loader.vectorize()
    test_data_samples = test_loader.vectorize()
    # a new oracle can be generated by passing oracle_init=True in the generator constructor
    # samples for the new oracle can be generated using utils.batchwise_sample()

    gen = generator.Generator(
        GEN_EMBEDDING_DIM, GEN_HIDDEN_DIM, VOCAB_SIZE, MAX_SEQ_LEN, gpu=CUDA)
    dis = discriminator.Discriminator(
        DIS_EMBEDDING_DIM, DIS_HIDDEN_DIM, VOCAB_SIZE, MAX_SEQ_LEN, gpu=CUDA)

    if CUDA:
        gen = gen.cuda()
        dis = dis.cuda()
        real_data_samples = real_data_samples.cuda()

    # GENERATOR MLE TRAINING
    print('Starting Generator MLE Training...')
    gen_optimizer = optim.Adam(gen.parameters(), lr=1e-2)
    train_generator_MLE(gen, gen_optimizer, real_data_samples, MLE_TRAIN_EPOCHS)

    torch.save(gen.state_dict(), pretrained_gen_path)
    # gen.load_state_dict(torch.load(pretrained_gen_path))

    # PRETRAIN DISCRIMINATOR
    print('\nStarting Discriminator Training...')
    dis_optimizer = optim.Adagrad(dis.parameters())
    train_discriminator(dis, dis_optimizer, real_data_samples, gen, PRETRAIN_DIS_EPOCHS, 1)

    torch.save(dis.state_dict(), pretrained_dis_path)
    # dis.load_state_dict(torch.load(pretrained_dis_path))

    # ADVERSARIAL TRAINING
    print('\nStarting Adversarial Training...')
    # oracle_loss = utils.batchwise_oracle_nll(
    #     gen, oracle, POS_NEG_SAMPLES, BATCH_SIZE, MAX_SEQ_LEN, gpu=CUDA)
    # print('\nInitial Oracle Sample Loss : %.4f' % oracle_loss)

    for epoch in range(ADV_TRAIN_EPOCHS):
        print('\n--------\nEPOCH %d\n--------' % (epoch+1))
        # TRAIN GENERATOR
        print('\nAdversarial Training Generator : ', end='')
        sys.stdout.flush()
        train_generator_PG(gen, gen_optimizer, dis, real_data_samples, 1)

        # TRAIN DISCRIMINATOR
        print('\nAdversarial Training Discriminator : ')
        train_discriminator(dis, dis_optimizer, real_data_samples, gen, 3, 1)
