const { readFile } = require('fs');
FILE_PATH = './example_data.txt';

const parseData = (data) => {
  const knapsackList = data.split('\n');
  const compartmentList = knapsackList.map(knapsack => [knapsack.substring(0, knapsack.length / 2), knapsack.substring(knapsack.length / 2)]);

  return compartmentList;
}

const findKnapsackDuplicates = (pouches) => {

  const knapsackItems = {};
  let duplicates = [];

  const [firstPouch, secondPouch] = pouches;

  for (const item of firstPouch) {
    if (!knapsackItems[item]) {
      knapsackItems[item] = 1;
    }
  }

  console.log(knapsackItems);

  for (const item of secondPouch) {
    const itemPriority = findDuplicatePriority(item);

    if (knapsackItems[item] && !duplicates.includes(itemPriority)) {
      console.log("Item", item)
      duplicates.push(itemPriority);
    }
  }

  return duplicates.reduce((prev, next) => prev + next);

}

const findDuplicatePriority = item => {
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = lowercaseLetters.toUpperCase();
  const allLetters = lowercaseLetters + uppercaseLetters;
  const letterArray = allLetters.split('');
  return letterArray.findIndex(letter => item === letter) + 1;
}

const findAllDuplicates = (knapsackList) => {
  const knapsackDuplicates = [];
  for (const knapsack of knapsackList) {
    knapsackDuplicates.push(findKnapsackDuplicates(knapsack))
  }

  return knapsackDuplicates;
}

readFile(FILE_PATH, { encoding: 'utf-8' }, (error, data) => {
  if (error) throw error;

  const compartmentList = parseData(data);

  const firstDuplicates = findKnapsackDuplicates(compartmentList[0]);
  const allDuplicates = findAllDuplicates(compartmentList);

  console.log(compartmentList);
  console.log(allDuplicates);
  console.log(allDuplicates.reduce((prev, next) => prev + next));
  // console.log(firstDuplicates);
});