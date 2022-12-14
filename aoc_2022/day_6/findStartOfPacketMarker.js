const { readFile } = require('fs');

const FILE_PATH = './example_data_1.txt';

const findMarker = (signal) => {

  const window = [];

  

  return signal;

};

readFile(FILE_PATH, { encoding: 'utf-8'}, (error, data) => {
  if (error) throw error;

  const signalString = data;

  console.log(findMarker(signalString));


})