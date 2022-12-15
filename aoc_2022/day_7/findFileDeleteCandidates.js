const { readFile } = require("fs");

const FILE_PATH = "./example_data.txt";
/**
 * fileObj: {
 *  name,
 *  size,
 * }
 */
const createFile = (currentFolder, fileObj) => {
  currentFolder.files = currentFolder.files || {};
  if (currentFolder.files[fileObj.name]) return;
  const newFile = { ...fileObj };
  currentFolder.files[fileObj.name] = newFile;
};

const createFolder = (currentFolder, folderName) => {
  if (currentFolder.folders[folderName]) return;

  const newFolder = {
    name: folderName,
    folders: {
      "..": currentFolder,
    }
  };
  currentFolder.folders[foldername] = newFolder;
};

const evalCommand = (command, lineObject, currentFolder, root) => {
  const commandArray = command.split(' ');
  const commandName = commandArray[0];
  if (commandName === "cd") {
    console.log("command Array", commandArray);
    const folderName = commandArray[1];

    if (folderName === "/") {
      return root;
    }

    return currentFolder.folders[folderName];

  }

  if (commandName === "ls") {
    console.log("ls");
  }
  lineObject.command = commandName;

  return currentFolder;
};

const evalConsoleLines = (data, currentFolder, root) => {
  const consoleLines = [];
  let lineObject = {};

  const sampleLine = data[1];

  for (const line of data) {

    const commandWords = line.split(' ');
    // console.log('commandWords', commandWords);
    if (commandWords[0] === '$') {
      lineObject.type = "command";
      lineObject = {
        type: "command",
        command: commandWords[1],

      };

      if (commandWords[2]) {
        lineObject.argument = commandWords[2];
      }

    }
    else if (commandWords[0] === "dir") {
      lineObject = {
        type: 'folder',
        name: commandWords[1],
      };
    }
    else {
      const [size, name] = commandWords;
      lineObject = {
        type: 'file',
        size,
        name,
      };
    }
    // console.log(lineObject);
    consoleLines.push(lineObject);
  }

  console.log(consoleLines);

};

readFile(FILE_PATH, { encoding: "utf-8" }, (error, data) => {
  if (error) throw error;

  const root = {
    name: "root",
    directories: {},
    files: {}

  };
  const dataArray = data.split("\n");
  let currentFolder = root;
  evalConsoleLines(dataArray, currentFolder, root);
});