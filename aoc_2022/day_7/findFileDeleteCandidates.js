const { readFile } = require("fs");

const FILE_PATH = "./example_data.txt";

readFile(FILE_PATH, { encoding: "utf-8" }, (error, data) => {
  if (error) throw error;

  const sampleData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
  `;

  console.log(sampleData.split("\n"));
});