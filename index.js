let fs = require('fs');
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
    let promises = [() => {
      fs.readFile('./resources/aqi-breakpoint.json', 'utf8', (err, data) => {
        breakpoints = data;
        return Q.resolve(breakpoints);
      });
    }, () => {
      fs.readFile('./resources/aqi-general-messages.json', 'utf8', (err, data) => {
        generalMessages = data;
        return Q.resolve(generalMessages);
      });
    }, () => {
      fs.readFile('./resources/aqi-specific-messages.json', 'utf8', (err, data) => {
        specificMessages = data;
        return Q.resolve(specificMessages);
      });
    }];
    Q.all(promises).then(() => {
      return;
    });
  }

  getRegularAQIResult(pollutantCode, concentration) {
    /* Grab concentration object */

  }

  getNowcastAQIResult(pollutantCode, concentration) {

  }

  doDummy() {
    return 'Hello world';
  }
}

const AQICalculatorInstance = new AQICalculator();

module.exports = AQICalculatorInstance;