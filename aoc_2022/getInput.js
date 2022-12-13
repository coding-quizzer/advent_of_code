const { readFile } = require('fs');

const dataStringToArray = (data) => data.split('\n');

const getPuzzleInput = (filePath, parseData, calculateResult, printInitialArray) => {

  if (!Array.isArray(parseData)) {
    parseDataArray = [parseData]
  }
  else {
    parseDataArray = parseData;
  }

  readFile(filePath, { encoding: 'utf8' }, (error, data) => {

    if (error) throw error;

    const dataArray = dataStringToArray(data);

    if (printInitialArray) {
      console.log(dataArray)
    };

    const startData = parseDataArray[0](dataArray);
    const result = calculateResult[0](startData);

    console.log("First Solution", result)

    if (calculateResult[1]) {
      const secondStartData = parseDataArray[1] || startData;

      const secondResult = calculateResult[1](secondStartData);

      console.log("Second Solution", secondResult);

    }

  })
}

module.exports = getPuzzleInput;


