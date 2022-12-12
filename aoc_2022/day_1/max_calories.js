const { readFile } = require("fs");
const FILE_PATH = './data.txt';

const getCaloriesPerElf = (calorieItems) => {
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

const getMaxThreeCalories = (caloriesPerPerson) => {
  let temp;
  let minIndex = 0;
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


readFile(FILE_PATH, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err;
  const dataList = data.split('\n').map((item) => parseInt(item));
  const caloriesPerElf = getCaloriesPerElf(dataList);
  console.log(caloriesPerElf);

  console.log(getMaxCalories(caloriesPerElf).calories);

  console.log(getMaxThreeCalories(caloriesPerElf));
  console.log(getMaxThreeCalories(caloriesPerElf).slice(0, 3).reduce((prev, next) => prev + next));

})