VOCAB_SIZE = 10000
UNKNOWN_TOKEN = "<unk>"
MAX_SEQ_LEN = 30

CUDA = False
BATCH_SIZE = 32
MLE_TRAIN_EPOCHS = 20
PRETRAIN_DIS_EPOCHS = 20
ADV_TRAIN_EPOCHS = 50

GEN_EMBEDDING_DIM = 32
GEN_HIDDEN_DIM = 32
DIS_EMBEDDING_DIM = 64
DIS_HIDDEN_DIM = 64

MAX_TEXT_LEN = 100
MIN_TEXT_LEN = 2
INP_SEQ_LEN = 1

# data_path_train = ["aclImdb/train/pos/", "aclImdb/train/neg/"]
# data_path_test = ["aclImdb/test/pos/", "aclImdb/test/neg/"]

# oracle_samples_path = './oracle_samples.trc'
# oracle_state_dict_path = './oracle_EMBDIM32_HIDDENDIM32_VOCAB5000_MAXSEQLEN20.trc'
pretrained_gen_path = './gen_MLEtrain_EMBDIM_32_HIDDENDIM_32_VOCAB_10000_MAXSEQLEN_30.trc'
pretrained_dis_path = './dis_pretrain_EMBDIM_64_HIDDENDIM_64_VOCAB_10000_MAXSEQLEN_30.trc'

data_path_train =["live_career/", "resume_example/", "kick_resume/"] 
data_path_test = ["live_career/"]