let fs = require('fs');
let path = require('path');

let instance = null;
let targetBreakpointIndex = undefined;
let breakpoints = undefined;
let generalMessages = undefined;
let specificMessages = undefined;

/**
 * Import modules
 */
let pollutantBreakpointFinder = require('./utils/PollutantBreakpointFinder');
let messageService = require('./utils/MessageService');
let calculator = require('./utils/Calculator');
let constants = require('./utils/Constants');

class AQICalculator {
  constructor() {
    breakpoints = JSON.parse(fs.readFileSync(path.join(__dirname, 'resources/aqi-breakpoint.json'), 'utf8'));
    generalMessages = JSON.parse(fs.readFileSync(path.join(__dirname, 'resources/aqi-general-messages.json'), 'utf8'));
    specificMessages = JSON.parse(fs.readFileSync(path.join(__dirname, 'resources/aqi-specific-messages.json'), 'utf8'));
  }

  getAQIResult(pollutantCode, concentration) {
    /* Grab concentration object */
    return new Promise((resolve, reject) => {
      pollutantBreakpointFinder.getConcentrationRangeWithAvgConcentration(pollutantCode, concentration, breakpoints).then((breakpointIndex) => {
        targetBreakpointIndex = breakpointIndex;
        let aqi = calculator.calculateAQI(concentration, targetBreakpointIndex);
        return aqi;
      }, (err) => {
        reject(err);
      }).then((aqi) => {
        let generalMessage = messageService.getGeneralMessage(aqi, generalMessages);
        let specificMessage = messageService.getSpecificMessage(pollutantCode, aqi, specificMessages);

        let result = {
          pollutant: pollutantCode,
          concentration: concentration,
          aqi: aqi,
          category: generalMessage.category,
          generalMessage: generalMessage.message,
          healthEffectsStatements: specificMessage.healthEffectsStatements,
          guidanceStatement: specificMessage.guidanceStatement
        }
        resolve(result);
      });
    });
  }

  getNowcastAQIResult(pollutantCode, concentrations) {
    return new Promise((resolve, reject) => {
      calculator.calculateNowcastConcentration(pollutantCode, concentrations).then((nowcastConcentration) => {
        this.getAQIResult(pollutantCode, nowcastConcentration).then((result) => {
          resolve(result);
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

const AQICalculatorInstance = new AQICalculator();

module.exports = {
  AQICalculator: AQICalculatorInstance,
  PollutantType: constants.POLLUTANT_TYPE
};