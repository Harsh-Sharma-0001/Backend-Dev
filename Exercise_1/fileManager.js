const fs = require("fs");
const path = require("path");

const [, , command, ...args] = process.argv;

switch (command) {
  case "read":
    readFile(args[0]);
    break;
  case "write":
    writeFile(args[0], args[1]);
    break;
  case "copy":
    copyFile(args[0], args[1]);
    break;
  case "delete":
    deleteFile(args[0]);
    break;
  case "list":
    listDirectory(args[0]);
    break;
  default:
    console.log("Invalid command");
}

function readFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return console.error(err.message);
    console.log(data);
  });
}

function writeFile(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) return console.error(err.message);
    console.log("File written successfully");
  });
}

function copyFile(src, dest) {
  fs.copyFile(src, dest, (err) => {
    if (err) return console.error(err.message);
    console.log("File copied successfully");
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) return console.error(err.message);
    console.log("File deleted successfully");
  });
}

function listDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) return console.error(err.message);
    files.forEach((file) => console.log(file));
  });
}
