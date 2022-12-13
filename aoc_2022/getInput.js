const { readFile } = require('fs');

const dataStringToArray = (data) => data.split('/n');

const getPuzzleInput = (filePath, parseData, calculateResult) => {

  readFile(filePath, { encoding: 'utf8' }, (error, data) => {

    if (error) throw error;

    const dataArray = dataStringToArray(data);

    const startData = parseData(dataArray);
    const result = calculateResult(startData);

    console.log(result)
  })
}

module.exports = getPuzzleInput();


