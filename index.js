let fs = require('fs');
let path = require('path');
let Q = require('q');


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
let messageService = require('./utils/MessageService');
let calculator = require('./utils/Calculator');
let constants = require('./utils/Constants');


class AQICalculator {
  constructor() {
    // TODO: refactor reading file to asynchronous function
    breakpoints = JSON.parse(fs.readFileSync(path.join(__dirname, 'resources/aqi-breakpoint.json'), 'utf8'));
    generalMessages = JSON.parse(fs.readFileSync(path.join(__dirname, 'resources/aqi-general-messages.json'), 'utf8'));
    specificMessages = JSON.parse(fs.readFileSync(path.join(__dirname, 'resources/aqi-specific-messages.json'), 'utf8'));
  }

  getAQIResult(pollutantCode, concentration) {
    /* Grab concentration object */
    return Q.Promise((resolve, reject) => {
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
    //TODO: I'll ship this shit later, trust me !
  }
}

const AQICalculatorInstance = new AQICalculator();

module.exports = {
  AQICalculator: AQICalculatorInstance,
  PollutantType: constants.POLLUTANT_TYPE
};