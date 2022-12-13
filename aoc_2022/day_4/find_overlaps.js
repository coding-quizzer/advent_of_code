const { readFile } = require('fs');

FILE_PATH = './example_data.txt';

const parseInput = (data) => {
  console.log(data.split('\n'));
  return data.split('\n');
}

readFile(FILE_PATH, { encoding: 'utf-8' }, (error, data) => {
  if (error) throw error;
  parseInput(data);

});