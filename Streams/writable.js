const fs = require("fs");
const path = require("path");

// const inputPath = path.resolve(__dirname, "input.txt");
// const outputPath = path.resolve(__dirname, "output.txt");

// const readStream = fs.createReadStream(inputPath);
// const writeStream = fs.createWriteStream(outputPath);

// readStream.pipe(writeStream);



const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");

const inputStream = fs.createReadStream(inputFilePath, "utf-8");

inputStream.on("data", (chunk) => {
    console.log("Data is reading in chunks : ", chunk);
});

