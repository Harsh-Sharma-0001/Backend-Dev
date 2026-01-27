const fs = require("fs");
const path = require("path");
const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");


// const inputPath = path.resolve(__dirname, "input.txt");
// const outputPath = path.resolve(__dirname, "output.txt");

// const readStream = fs.createReadStream(inputPath);
// const writeStream = fs.createWriteStream(outputPath);

// readStream.pipe(writeStream);



// const inputFilePath = path.join(__dirname, "input.txt");
// const outputFilePath = path.join(__dirname, "output.txt");

// const inputStream = fs.createReadStream(inputFilePath, "utf-8");

// inputStream.on("data", (chunk) => {
//     console.log("Data is reading in chunks : ", chunk);
// });



const readStream = fs.createReadStream(inputFilePath, {encoding:"utf-8"});
const writeStream = fs.createWriteStream(outputFilePath);

readStream.pipe(writeStream);

writeStream.on("finish", ()=>{
    console.log("Write Stream is end")
});

