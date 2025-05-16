
const { argv } = require('node:process');

const exitMessage = '\nExiting...\n';

function checkArgIsPassed(stringArg) {
  if (!stringArg) {
    console.log('Please pass an agrument to the script.' + exitMessage);
    process.exit(1); 
  }
}

function parseArgForArray(stringArg) {
  let array = null;
  try {
    array = JSON.parse(stringArg);
    if (!Array.isArray || array.length === 0) {
      throw new Error('Argument parsing error: \n please pass valid or not empty array');
    }
  } catch(error) {
    console.error(error.message);
    console.log(exitMessage)
    process.exit(1);
  }
  return array;
}

function getSum(arr, sum = 0) {   
    let current = arr.shift();
    if (typeof current === 'number') {
        sum = sum + current;
        return getSum(arr, sum);
    } else if (Array.isArray(current)) {
        return getSum([...current, ...arr], sum);
    }
    return sum;
}

checkArgIsPassed(argv[2]);
const parsedArray = parseArgForArray(argv[2]);

console.log(getSum(parsedArray));