const { readFile } = require('fs');

const FILE_PATH = './data.txt';

const findMarker = (signal) => {

  let startIndex = 0;
  let markerFound = false;

  while(!markerFound) {

    const window = signal.slice(startIndex, startIndex + 4).split('');
    const matchObject = {};
    
    
    
    for (const index in window) {
      const intIndex = parseInt(index);
      const char = window[intIndex];
      if (matchObject[char] !== undefined) {
        startIndex = matchObject[char] + 1;
        console.log(startIndex);
        break;
      }
      
      matchObject[char] = (startIndex + intIndex);
      
      if(intIndex === 3) {
        markerFound = true;
      }

    }
    console.log("match object", matchObject);
    console.log("Marker Found", markerFound);
    
    if(startIndex > (signal.length - 3)) throw new Error ("Signal marker not found");
  }



  console.log(signal.slice(startIndex, startIndex + 4).split(''));
  return startIndex + 4;

};

readFile(FILE_PATH, { encoding: 'utf-8'}, (error, data) => {
  if (error) throw error;

  const signalString = data;

  console.log(findMarker(signalString));


})