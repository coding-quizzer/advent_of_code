const getPuzzleInput = require('../getInput');
const FILE_PATH = './data.txt';

const getCaloriesPerElf = (dataList) => {
  const calorieItems = dataList.map((item) => parseInt(item));
  let counter = 0;
  let elfList = [];
  for(const calorieItem of calorieItems) {
    if (!calorieItem) {
      elfList.push(counter)
      counter = 0;
      continue;
    }
      counter += calorieItem;
  }

  if(counter) elfList.push(counter);


  return elfList;
}

const getMaxCalories = (caloriesForElves) => {
  let maxCaloriesObject = {}
  for (let index in caloriesForElves) {
    const caloriesForElf = caloriesForElves[index];
    if (!maxCaloriesObject.calories || (maxCaloriesObject.calories < caloriesForElf)) {
      maxCaloriesObject = { index: parseInt(index), calories: caloriesForElf };
    }
   }

   return maxCaloriesObject;

}

const getMaxCaloriesNumber = (caloriesForElves) => {
  return getMaxCalories(caloriesForElves).calories
}

const getMaxThreeCalories = (caloriesPerPerson) => {
  let temp;
  const orderedCaloriesPerPerson = [...caloriesPerPerson];
  
  for (let minIndex = 0; minIndex < 3; minIndex++) {

    // Swap the highest value of calories per person with the first item in the array
    let maxCalories = getMaxCalories(orderedCaloriesPerPerson.slice(minIndex));
    temp = orderedCaloriesPerPerson[minIndex];
    orderedCaloriesPerPerson[minIndex] = maxCalories.calories;
    orderedCaloriesPerPerson[maxCalories.index + minIndex] = temp;

  }

  return orderedCaloriesPerPerson;

}

const getMaxThreeCaloriesTotal = (caloriesForElves) => {
  return getMaxThreeCalories(caloriesForElves).slice(0, 3).reduce((prev, next) => prev + next);
}

getPuzzleInput(FILE_PATH, getCaloriesPerElf, [getMaxCaloriesNumber, getMaxThreeCaloriesTotal]);