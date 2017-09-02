let Q = require('q');

let targetBreakpoint;
let targetConcentrationRange;
let constants = require('./Constants');

const chalk = require('chalk');

module.exports = {
  getConcentrationRangeWithAvgConcentration(pollutantCode, concentration, breakpoints) {
    return new Q.Promise((resolve, reject) => {
      breakpoints.forEach((breakpoint) => {
        if (breakpoint.code === pollutantCode) {
          targetBreakpoint = breakpoint;
        }
      });
      if (targetBreakpoint === undefined) {
        reject(constants.MESSAGES.INVALID_MESSAGES.INVALID_POLLUTANT_CODE);
      } else {
        targetBreakpoint.concentrations.forEach((breakpointConcentration) => {
          if (concentration >= breakpointConcentration.min && concentration <= breakpointConcentration.max)
            resolve(concentration);
        });
        reject(constants.MESSAGES.INVALID_MESSAGES.INVALID_CONCENTRATION_RANGE);
      }
    });
  }
}