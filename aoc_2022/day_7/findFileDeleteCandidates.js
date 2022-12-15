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

const createFolder = (currentFolder, folderName, directories) => {
  if (currentFolder.folders[folderName]) return;

  const newFolder = {
    name: folderName,
    folders: {
      "..": currentFolder,
    }

  };
  directories.push(newFolder);
  currentFolder.folders[folderName] = newFolder;
};

const evalConsoleLines = (consoleLines, root) => {
  // console.log(consoleLines);
  let currentFolder = root;
  let index = 0;
  const directories = [root];
  while (index < consoleLines.length) {

    console.log(index);
    let lineObject = consoleLines[index];
    if (lineObject.type === "command") {
      console.log(lineObject.command);

      if (lineObject.command === "cd") {
        const folderName = lineObject.argument;
        console.log("Folder", folderName);

        if (folderName === "/") {
          currentFolder = root;
        } else {
          currentFolder = currentFolder.folders[folderName];
        }

        index++;

      }

      if (lineObject.command === "ls") {
        //console.log("ls");
        index++;
        while (consoleLines[index] && consoleLines[index].type !== "command") {
          //console.log(consoleLines[index]);
          lineObject = consoleLines[index];
          if (lineObject.type === "folder") {
            createFolder(currentFolder, lineObject.name, directories);
          }

          if (lineObject.type === "file") {
            createFile(currentFolder, { name: lineObject.name, size: lineObject.size });
          }
          // console.log(index);
          index++;

        }
      }
    }

  }
  return { root, directories };
};

const parseConsoleLines = (data) => {
  const consoleLines = [];
  let lineObject = {};

  for (const line of data) {

    const commandWords = line.split(' ');
    // console.log('commandWords', commandWords);
    if (commandWords[0] === '$') {
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

  return consoleLines;

};

readFile(FILE_PATH, { encoding: "utf-8" }, (error, data) => {
  if (error) throw error;

  const root = {
    name: "root",
    folders: {},
    files: {}

  };
  const dataArray = data.split("\n");
  let currentFolder = root;
  const commands = parseConsoleLines(dataArray);
  const { directories } = evalConsoleLines(commands, root);
  console.log(root);
  console.log(directories);
});