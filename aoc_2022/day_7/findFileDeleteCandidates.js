const { readFile } = require("fs");

const FILE_PATH = "./example_data.txt";
/**
 * fileObj: {
 *  name,
 *  size,
 * }
 */
const createFile = (currentFolder, fileObj) => {
  const newFile = { ...fileObj };
  if (!currentFolder.files) {
    currentFolder.files = {};
  }

  currentFolder.files[fileObj.name] = newFile;
};

const createFolder = (currentFolder, folderName) => {
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

    const folderName = commandArray[1];

    if (folderName === "/") {
      return root;
    }

    return currentFolder.folders[folderName];

  }
  lineObject.command = commandName;
  lineObject.path = folderName;

  return currentFolder;
};

const evalConsoleLines = (data, currentFolder, root) => {
  const consoleLines = [];
  let lineObject = {};

  const sampleLine = data[0];

  const line = sampleLine;
  let mode = "";


  if (line[0] === '$') {
    lineObject.type = "command";
    currentFolder = evalCommand(line.substring(2), lineObject, currentFolder, root);
    console.log(currentFolder);
  }

};

readFile(FILE_PATH, { encoding: "utf-8" }, (error, data) => {
  if (error) throw error;

  const sampleData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
`;

  const root = {
    name: "root",
    directories: {},
    files: {}

  };
  const dataArray = sampleData.split("\n");
  let currentFolder = root;
  evalConsoleLines(dataArray, currentFolder, root);
});