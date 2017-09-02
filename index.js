let fs = require('fs');
let Q = require('q');
const chalk = require('chalk');

/**
 * Declare variables
 */
let instance = null;
let targetBreakpointIndex = undefined;
let breakpoints = undefined;
let generalMessages = undefined;
let specificMessages = undefined;

/**
 * Import modules
 */

let pollutantBreakpointFinder = require('./utils/PollutantBreakpointFinder');
let dataHelper = require('./utils/DataHelper');

class AQICalculator {
  constructor() {
    // TODO: refactor reading file to asynchronous function
    breakpoints = JSON.parse(fs.readFileSync('./resources/aqi-breakpoint.json', 'utf8'));
    generalMessages = fs.readFileSync('./resources/aqi-general-messages.json', 'utf8');
    specificMessages = fs.readFileSync('./resources/aqi-specific-messages.json', 'utf8');
    console.log(chalk.blue('Finish reading files'));
  }

  getRegularAQIResult(pollutantCode, concentration) {
    /* Grab concentration object */
    return Q.Promise((resolve, reject) => {
      pollutantBreakpointFinder.getConcentrationRangeWithAvgConcentration(pollutantCode, concentration, breakpoints).then((breakpointIndex) => {
        targetBreakpointIndex = breakpointIndex;
        resolve('done');
      }, (err) => {
        reject(err);
      });
    })
  }

  getNowcastAQIResult(pollutantCode, concentration) {

  }
}

const AQICalculatorInstance = new AQICalculator();

module.exports = {
  AQICalculator: AQICalculatorInstance,
  PollutantType: dataHelper.POLLUTANT_TYPE
};