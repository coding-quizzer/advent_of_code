const { readFile } = require("fs");

const FILE_PATH = "./example_data.txt";

const evalCommand = (command, lineObject) => {
  const commandArray = command.split(' ');
  const commandName = commandArray[0];
  const path = commandArray[1] === "/" ? "root" : commandArray[1];
  lineObject.command = commandName;
  lineObject.path = path;
};

const evalConsoleLines = (data) => {
  const consoleLines = [];
  let lineObject = {};

  const sampleLine = data[0];

  const line = sampleLine;
  let mode = "";


  if (line[0] === '$') {
    lineObject.type = "command";
    evalCommand(line.substring(2), lineObject);
    console.log(lineObject);
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

  const dataArray = sampleData.split("\n");
  evalConsoleLines(dataArray);
});