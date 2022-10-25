from matplotlib.dates import datestr2num
from const import *
from dataloader import *
from generator import *
import sys


def test_dataloader():
    dataset = ProfessionalSummaryDataset(data_path_train)
    data_loader = DataLoader(dataset)
    data = data_loader.get_data()

    print(dataset[0])
    print(data[0])
    print(len(data))
    print(data_loader.vec_to_seq(data[0]))


def main(test_type):
    if (test_type == "dataloader"):
        test_dataloader()
    else:
        print("No test")


if __name__ == "__main__":
   main(sys.argv[1])
