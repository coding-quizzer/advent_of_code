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

const parseBoxes = (boxes) => {

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

  return boxColumns;

}

const parseData = (data) => {
  const boxes = [];
  const instructions = [];
  const index = 0;
  let stage = 'boxes';
  for (const row of data) {
    const firstChar  = row.trim()[0];
    
    if (!firstChar || parseInt(firstChar) === 1) continue;

    if (row.substring(0, 4) === "move") instructions.push(row);

    if (firstChar === '[') boxes.push(row);
  }

  console.log(instructions);

  const boxColumns = parseBoxes(boxes);

 

  console.log(boxColumns);
}

readFile(FILE_PATH, { encoding: 'utf8' }, (error, data) => {
  if(error) throw error;

  const lines = data.split('\n');

  const newData = parseData(lines);
})