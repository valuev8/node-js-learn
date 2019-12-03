const fs = require('fs');
const csv = require('csvtojson');

const filePath = './task2/csv/sample.csv';
const readStream = fs.createReadStream(filePath);
const writeStream = fs.createWriteStream('./task2/txt/output.txt');
const errorHandler = (error) => console.log(`Sorry, something goes wrong. ${error}`);

readStream
    .on('error', errorHandler)
    .pipe(csv())
    .on('error', errorHandler)
    .pipe(writeStream)
    .on('error', errorHandler);
