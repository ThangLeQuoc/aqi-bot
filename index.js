let fs = require('fs');
let Q = require('q');
const chalk = require('chalk');

/**
 * Declare variables
 */
let instance = null;
let breakpoints = undefined;
let generalMessages = undefined;
let specificMessages = undefined;


class AQICalculator {
  constructor() {
    // TODO: refactor reading file to asynchronous function
    breakpoints=  fs.readFileSync('./resources/aqi-breakpoint.json', 'utf8');
    generalMessages = fs.readFileSync('./resources/aqi-general-messages.json', 'utf8');
    specificMessages = fs.readFileSync('./resources/aqi-specific-messages.json', 'utf8');
    console.log(chalk.blue('Finish reading files'));
  }

  getRegularAQIResult(pollutantCode, concentration) {
    /* Grab concentration object */


  }

  getNowcastAQIResult(pollutantCode, concentration) {

  }

  viewFile(){
    console.log(breakpoints);
  }

}

const AQICalculatorInstance = new AQICalculator();

module.exports = AQICalculatorInstance;