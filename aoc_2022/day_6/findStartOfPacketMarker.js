const { readFile } = require('fs');

const FILE_PATH = './data.txt';

const findMarker = (signal, size) => {

  let startIndex = 0;
  let markerFound = false;

  while(!markerFound) {

    const window = signal.slice(startIndex, startIndex + size).split('');
    const matchObject = {};
    // console.log("window", window)
    
    
    for (const index in window) {
      const intIndex = parseInt(index);
      const char = window[intIndex];
      if (matchObject[char] !== undefined) {
        startIndex = matchObject[char] + 1;
        break;
      }
      
      matchObject[char] = (startIndex + intIndex);
      
      if(intIndex === size - 1) {
        console.log("window", window);
        markerFound = true;
      }

    }
    // console.log("match object", matchObject);
    // console.log("Marker Found", markerFound);
    
    if(startIndex > (signal.length - size + 1)) throw new Error ("Signal marker not found");
  }



  console.log(signal.slice(startIndex, startIndex + size).split(''));
  return startIndex + size;

};

readFile(FILE_PATH, { encoding: 'utf-8'}, (error, data) => {
  if (error) throw error;

  const signalString = data;

  console.log(findMarker(signalString, 4));

  console.log(findMarker(signalString, 14));


})