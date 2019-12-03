const readline = require('readline');
const process = require('process');

process.stdin.setEncoding('utf8');

// 1st variant --- what is the difference between these implementations, which is better, why??
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (answer) => {
    const reverseInput = answer
        .toString()
        .split('')
        .reverse()
        .join('');

    process.stdout.write(reverseInput);
});

// 2nd variant
// process.stdin.on('data', (answer) => {
//     const reverseInput = answer
//         .toString()
//         .split('')
//         .reverse()
//         .join('');
//
//     process.stdout.write(reverseInput);
// });
