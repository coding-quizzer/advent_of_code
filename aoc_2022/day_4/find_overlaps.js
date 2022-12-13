const { readFile } = require('fs');

FILE_PATH = './data.txt';

const getLineRanges = (line) => {

  let currNumber = "";
  let rangeArr = [];
  const lineRanges = [];
  for(const char of line) {
    if (/[0-9]/.test(char)) {
      currNumber += char;
      continue;
    }

    rangeArr.push(parseInt(currNumber));
    currNumber = "";
    if (char === ',') {
      lineRanges.push(rangeArr);
      rangeArr = [];
    }
    
  }

  rangeArr.push(parseInt(currNumber));
  lineRanges.push(rangeArr);

  return lineRanges;

}

const parseInput = (data) => {
  console.log(data.split('\n'));
  const lines = data.split('\n');

  const processedData = lines.map(line => getLineRanges(line))
  
  console.log(processedData);
  return processedData;
}


const isContained = (range) => {
  const [range1, range2] = range;
  return ((range1[0] >= range2[0] && range1[1] <= range2[1]) || (range2[0] >= range1[0] && range2[1] <= range1[1]))
}

const getRangeContainedCount = (rangeList) => {
  const containedRanges = rangeList.filter(range => (isContained(range)));

  return containedRanges.length;
}

const hasOverlap = (range) => {
  const [range1, range2] = range;
  return !(range1[1] < range2[0] || range2[1] < range1[0])
}

const getRangeOverlapCount = (rangeList) => {
  const overlapList = rangeList.filter((range) => hasOverlap(range))
  return overlapList.length;
}

readFile(FILE_PATH, { encoding: 'utf-8' }, (error, data) => {
  if (error) throw error;
  const rangeList = parseInput(data);
  console.log(getRangeContainedCount(rangeList));
  console.log(getRangeOverlapCount(rangeList));

});