const { readFile } = require('fs');

FILE_PATH = "./data.txt";

const getBoxRow = (boxes) => {

  const initialBoxesArray = [];
  let currentBox = "";

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

const commandToObject = (command) => {

  let partialWord = "";
  let number = "";
  let space = 0;
  let mode = "word";
  const commandObject = {};
  for(const char of command) {

    if(char === " ") space++;

    if(/[a-z]/.test(char)) {
      partialWord += char;
      continue;
    }

    if (mode === 'word' && space === 1) {
      mode = "number";
      space = 0;
    }

    if(/[0-9]/.test(char)) {
      number += char;
      continue;
    }

    if(mode === "number" && space === 1) {
     if (partialWord === "move") {
       commandObject.number = parseInt(number);
     }

     if (partialWord === "from") {
      commandObject.startIndex = parseInt(number);
      mode = "word";
     }

     if (partialWord === "to") {
      commandObject.endIndex = parseInt(number)
     }

     partialWord = "";
     number = "";
     mode = 'word';
     space = 0;

   }   

  }
  if (number) commandObject.endIndex = parseInt(number);
  return commandObject;

}

const parseInstructions = (instructions) => {
  const instructionsArray = [];
  for (const instruction of instructions) {
    const commandObject = commandToObject(instruction);
    instructionsArray.push(commandObject);
  }
  console.log(instructionsArray);
  return instructionsArray;
}

const parseData = (data) => {
  const boxes = [];
  const instructions = [];

  for (const row of data) {
    const firstChar  = row.trim()[0];
    
    if (!firstChar || parseInt(firstChar) === 1) continue;

    if (row.substring(0, 4) === "move") instructions.push(row);

    if (firstChar === '[') boxes.push(row);
  }

  const boxColumns = parseBoxes(boxes);

  const instructionsObject = parseInstructions(instructions);

  return { boxes: boxColumns, instructions: instructionsObject }
}

const moveBoxesApart = ({ boxes, instructions }) => {
  const newBoxes = boxes.map(box => [...box]);
  const newInstructions = [...instructions]
  for(let instruction of newInstructions) {
    const { number, startIndex, endIndex } = instruction;
    for (let i = 0; i < number; i++) {
      newBoxes[endIndex - 1].push(newBoxes[startIndex - 1].pop());
    }
    console.log(newBoxes);
  }
  return newBoxes;
}

const moveBoxesTogether = ({ boxes, instructions }) => {

  const newBoxes = boxes.map(box => [...box]);
  const newInstructions = [...instructions];


  for(let instruction of newInstructions) {
    const { number, startIndex, endIndex } = instruction;
    const midStack = [];
    for (let i = 0; i < number; i++) {
      midStack.push(newBoxes[startIndex - 1].pop());
    }
    console.log("midStack", midStack);

    while (midStack[0]) {
      newBoxes[endIndex - 1].push(midStack.pop());
    }
    console.log(newBoxes);
  }
  return newBoxes;

}

const getTopBoxes = (boxes) => {
  let boxString = "";
  for (box of boxes) {
    const topBoxLetter = box.pop()[1];
    boxString += topBoxLetter;
  }

  return boxString
}

readFile(FILE_PATH, { encoding: 'utf8' }, (error, data) => {
  if(error) throw error;

  const lines = data.split('\n');

  const newData = parseData(lines);
  console.log(newData);
  const newBoxes = moveBoxesApart(newData);
  const reverseTopBoxes = getTopBoxes(newBoxes);
  console.log(reverseTopBoxes);
  const newOrderedBoxes = moveBoxesTogether(newData);
  const orderedTopBoxes = getTopBoxes(newOrderedBoxes);
  console.log(orderedTopBoxes);


})