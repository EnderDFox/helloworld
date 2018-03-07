var xlsx = require('node-xlsx').default;
 
// Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
// Parse a file
// const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);
const workSheetsFromFile = xlsx.parse(`raw/skill.xlsx`);
console.log("0"?1:4);
console.log(" "?1:4);
console.log(workSheetsFromFile)

