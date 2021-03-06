import csv, re, os

from abstractdb import AbstractDB
from circrow import CircRow
from circhsa import CircHSA
from circhsagroup import CircHSAGroup
from circrangegroup import CircRangeGroup

class CircRNADbIter(AbstractDB):
    url = "http://reprod.njmu.edu.cn/cgi-bin/circrnadb/circRNADb.php"
    urlPrefix = "http://reprod.njmu.edu.cn/cgi-bin/circrnadb/detail_info.php?circ_id="
    hasIndividualURLs = True

    def __init__(self, directory):
        super().__init__("RNADb", directory)

        self.read_file = open(os.path.join(directory, "circRNA_dataset.txt"), 'r')
        self.read_obj = csv.reader(self.read_file, delimiter='\t')

        self.meta_index = -1
        self._updateLiftover(os.path.getmtime(self.read_file.name), "hg19")

    def __iter__(self):
        return self

    def __next__(self):
        while(True):
            line = next(self.read_obj)
            self.meta_index += 1

            ids = CircHSAGroup()
            ids.addCircHSA(CircHSA("circRNADb", line[0]))

            group = CircRangeGroup(ch=line[1], strand=line[4], versions=super().__next__())
            ret = CircRow(group=group, hsa=ids, gene=line[5], db_id = self.id, meta_index=self.meta_index, url=line[0])
            return ret

    def _toBedFile(self, fileFrom):
        next(self.read_obj)
        for line in self.read_obj:
            fileFrom.write(self._browserArgsToBedHelper(line[1], line[2], line[3], line[4], 1))
        self.read_file.seek(0)