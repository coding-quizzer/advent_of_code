const { readFile } = require('fs');

const FILE_PATH = "./data.txt";

const exampleData = [[3, 0, 3, 7, 3], [2, 5, 5, 1, 2], [6, 5, 3, 3, 2], [3, 3, 5, 4, 9], [3, 5, 3, 9, 0]];

const initializeDataObjectArray = data => {
  const initDataObjects = data.map(row => row.map(height => ({ height, visible: false })));
  const dataNumRows = data.length;
  const dataNumColumns = data[0].length;
  initDataObjects[0][0].visible = true;
  initDataObjects[0][dataNumColumns - 1].visible = true;
  initDataObjects[dataNumRows - 1][0].visible = true;
  initDataObjects[dataNumRows - 1][dataNumColumns - 1].visible = true;
  return initDataObjects;
};


const exampleDataArray = initializeDataObjectArray(exampleData);
const exampleDataArrayRow = exampleDataArray[3];

// const markVisibleTree = (visibleHeight, tree) => {

// };

const copyTreeRow = (treeRow) => treeRow.map(tree => ({ ...tree }));

const copyTreeObjectArray = (treeArray) => (
  treeArray.map(row => copyTreeRow(row))
);

const markVisibleTreesInRowForward = (treeRow) => {

  const markedRow = copyTreeRow(treeRow);

  let visibleHeight = -1;


  for (tree of markedRow) {
    if (tree.height > visibleHeight) {
      tree.visible = true;
      visibleHeight = tree.height;
    }
  }

  return markedRow;

};

const markVisibleTreesInRow = (treeRow) => {


  let markedRow = copyTreeRow(treeRow);
  // console.log(markedRow);

  markedRow = markVisibleTreesInRowForward(markedRow);

  let reverseMarkedRow = [...markedRow].reverse();

  reverseMarkedRow = markVisibleTreesInRowForward(reverseMarkedRow);

  return reverseMarkedRow.reverse();
};

const markVisibleTreesInColumnForward = (data, column) => {
  let markedData = copyTreeObjectArray(data);
  let visibleHeight = -1;
  for (let row = 0; row < data.length; row++) {
    const tree = markedData[row][column];

    if (tree.height > visibleHeight) {
      tree.visible = true;
      visibleHeight = tree.height;
    }

  }

  return markedData;
};

const markVisibleTreesInColumnReverse = (data, column) => {

  let markedData = copyTreeObjectArray(data);
  let visibleHeight = -1;
  for (let row = markedData.length - 1; row >= 0; row--) {
    const tree = markedData[row][column];

    if (tree.height > visibleHeight) {
      tree.visible = true;
      visibleHeight = tree.height;
    }

  }

  return markedData;
};

const markVisibleTreesInColumn = (data, column) => {

  let forwardsCheckedColumn = markVisibleTreesInColumnForward(data, column);
  let completelyCheckedColumn = markVisibleTreesInColumnReverse(forwardsCheckedColumn, column);

  return completelyCheckedColumn;

};

const markVisibleTreesInTreeObjectArray = (treeObjectArray) => {
  let newObjectArray = copyTreeObjectArray(treeObjectArray);
  // Skip the first and last rows, since those will all be marked visible when the columns are checked
  for (let column = 1; column < newObjectArray[0].length - 1; column++) {
    newObjectArray = markVisibleTreesInColumn(newObjectArray, column);
  }

  for (let row = 1; row < newObjectArray.length - 1; row++) {
    newObjectArray[row] = markVisibleTreesInRow(newObjectArray[row]);
  }

  return newObjectArray;
};

const countMarkedTrees = (markedTreesArray) => markedTreesArray.reduce((
  (counter, current) => counter += current.reduce(
    (counter, current) => counter = current.visible ? counter + 1 : counter
    , 0))
  , 0
);

const countVisibleTrees = (data) => {
  const initDataObjArray = initializeDataObjectArray(data);
  const visibleTrees = markVisibleTreesInTreeObjectArray(initDataObjArray);
  console.log(visibleTrees);
  const visibleTreeCount = countMarkedTrees(visibleTrees);

  return visibleTreeCount;
};

const parseData = (data) => (
  data
    .split('\n')
    .map(row => (
      row.split('')
        .map(stringNum => Number(stringNum))
    ))
);

const calculateScenicScore = (data, [row, column]) => {
  if (row === 0 || column === 0 || row === data.length - 1 || column === data[row].length - 1) return 0;

  const currHeight = data[row][column];
  let upDist = 0;
  let downDist = 0;
  let leftDist = 0;
  let rightDist = 0;

  for (let currY = row - 1; currY >= 0; currY--) {
    upDist++;
    if (data[currY][column] >= currHeight) {
      // console.log("Loop broken");
      break;

    }
  }

  for (let currY = row + 1; currY < data.length; currY++) {
    downDist++;
    if (data[currY][column] >= currHeight) {
      // console.log("Loop broken");
      break;
    }
  }

  for (let currX = column - 1; currX >= 0; currX--) {
    leftDist++;
    if (data[row][currX] >= currHeight) break;
  }

  for (let currX = column + 1; currX < data[row].length; currX++) {
    rightDist++;
    if (data[row][currX] >= currHeight) break;
  }

  return upDist * downDist * leftDist * rightDist;


};

const calculateMaxScenicScore = (data) => {
  let maxScore = 0;
  let maxScoreCoords = [0, 0];
  for (let row = 1; row < data.length - 1; row++) {
    for (let column = 1; column < data.length - 1; column++) {
      const currScore = calculateScenicScore(data, [row, column]);
      if (currScore > maxScore) {
        maxScore = currScore;
        maxScoreCoords = [row, column];
      }
    }

  }

  return { maxScore, maxScoreCoords };
};

readFile(FILE_PATH, { encoding: 'utf-8' }, (error, data) => {
  if (error) {
    console.error(error.message);
    return;
  }
  const heightArray = parseData(data);
  const initTreeObjectArray = initializeDataObjectArray(heightArray);
  const visibleTreeDataArrray = markVisibleTreesInTreeObjectArray(initTreeObjectArray);
  const visibleTreeCount = countMarkedTrees(visibleTreeDataArrray);
  console.log(visibleTreeCount);

  console.log(calculateMaxScenicScore(heightArray));

});