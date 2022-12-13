const { readFile } = require('fs');
FILE_PATH = './example_data.txt';

const makeDataArray = (data) => {
  return data.split('\n');
}

const parseDataHalves = (data) => {
  const knapsackList = makeDataArray(data);
  const compartmentList = knapsackList.map(knapsack => [knapsack.substring(0, knapsack.length / 2), knapsack.substring(knapsack.length / 2)]);

  return compartmentList;
}

const parseDataThrees = (data) => {
  const knapsackList = makeDataArray(data);

  const compartmentList = [];
  let pocket = [];

  for( const index in knapsackList) {
    const knapsack = knapsackList[index];

    pocket.push(knapsack);

    if (index % 3 === 2) {
      compartmentList.push([...pocket])
      pocket = [];
    }

  }

  console.log(compartmentList);
  return compartmentList;
}

const findKnapsackDuplicates = (pouches) => {

  const knapsackItems = {};

  for (const pouch of pouches) {  
    const knapsackPocketItems = {}
    
    for (const item of pouch) {
      if (!knapsackPocketItems[item]) {
        knapsackPocketItems[item] = 1;
      }
    }

    const knapsackItemKeys = Object.keys(knapsackPocketItems);
    for(const knapsackItemKey of knapsackItemKeys) {
      let knapsackItem = knapsackItems[knapsackItemKey];
      if (!knapsackItem) {
        knapsackItem = 0;
      }

      knapsackItem++;

      knapsackItems[knapsackItemKey] = knapsackItem;
    }
  }

  // console.log(knapsackItems);

  const knapsackItemArray = Object.keys(knapsackItems);

  console.log("Final Array", knapsackItemArray.filter(item => knapsackItems[item] === pouches.length))
  const duplicateItems =  knapsackItemArray.filter(item => knapsackItems[item] === pouches.length);
  return duplicateItems.map(item => findDuplicatePriority(item)).reduce((prev, next) => prev + next)
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

  const halvesCompartmentList = parseDataHalves(data);

  console.log(halvesCompartmentList);
  const allDuplicates = findAllDuplicates(halvesCompartmentList);

  // console.log(allDuplicates);
  console.log(allDuplicates.reduce((prev, next) => prev + next));
  // console.log(firstDuplicates);

  const threesCompartmentList = parseDataThrees(data);
  const allThreesDuplicates = findAllDuplicates(threesCompartmentList);
  console.log(allThreesDuplicates);
  console.log(allThreesDuplicates.reduce((prev, next) => prev + next))
});