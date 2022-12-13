const { readFile } = require('fs');

FILE_PATH = "./example_data.txt";

const getBoxRow = (boxes) => {

  const initialBoxesArray = [];
  let currentBox = "";

  console.log("First boxes row", boxes)

  for (let index in boxes) {
    const char = boxes[index];
    if (index % 4 === 3) {
      initialBoxesArray.push(currentBox);
      currentBox = "";
      continue;
    }
    
    currentBox += char;
  }

  initialBoxesArray.push(currentBox);

  return initialBoxesArray;

}

const parseData = (data) => {
  const boxes = [];
  const instructions = [];
  const index = 0;
  for (let i = 0; i < data.length && data[i].trim()[0] === '['; i++) {
    boxes.push(data[i]);
  }

  const initialBoxesArray = boxes.map(boxRow => getBoxRow(boxRow));

  const boxColumns = [];

  for (let column = 0; column < initialBoxesArray[0].length; column++) {
    const newColumn = [];
    // Calculate reversed columns, so that the tobox is at the far left, where it is easy to push to and pop from the array
    for (let row = initialBoxesArray.length - 1; row >= 0; row--) {
      if (initialBoxesArray[row][column] === '   ') continue;
      newColumn.push(initialBoxesArray[row][column])
    }

    boxColumns.push(newColumn);
  }

  console.log(boxColumns);
}

readFile(FILE_PATH, { encoding: 'utf8' }, (error, data) => {
  if(error) throw error;

  const lines = data.split('\n');

  const newData = parseData(lines);
})