VOCAB_SIZE = 20000
UNKNOWN_TOKEN = "<unk>"
MAX_SEQ_LEN = 30

CUDA = True
BATCH_SIZE = 32
MLE_TRAIN_EPOCHS = 20
PRETRAIN_DIS_EPOCHS = 20
ADV_TRAIN_EPOCHS = 50
POS_NEG_SAMPLES = 100000

GEN_EMBEDDING_DIM = 32
GEN_HIDDEN_DIM = 32
DIS_EMBEDDING_DIM = 64
DIS_HIDDEN_DIM = 64

data_path_train = ["aclImdb/train/pos/", "aclImdb/train/neg/"]
data_path_test = ["aclImdb/test/pos/", "aclImdb/test/neg/"]

oracle_samples_path = './oracle_samples.trc'
oracle_state_dict_path = './oracle_EMBDIM32_HIDDENDIM32_VOCAB5000_MAXSEQLEN20.trc'
pretrained_gen_path = './gen_MLEtrain_EMBDIM32_HIDDENDIM32_VOCAB5000_MAXSEQLEN20.trc'
pretrained_dis_path = './dis_pretrain_EMBDIM_64_HIDDENDIM64_VOCAB5000_MAXSEQLEN20.trc'
