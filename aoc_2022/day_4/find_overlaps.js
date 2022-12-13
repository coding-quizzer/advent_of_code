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

readFile(FILE_PATH, { encoding: 'utf-8' }, (error, data) => {
  if (error) throw error;
  parseInput(data);

});