let Q = require('q');


let targetConcentrationRange;
let constants = require('./Constants');


module.exports = {
  /**
   * Find concentration range with average concentration of pollutant
   * @param {pollutantCode} pollutantCode (ex: PM10, PM2.5) 
   * @param {concentration} concentration 
   * @param {breakpoints} breakpoints object 
   */
  getConcentrationRangeWithAvgConcentration(pollutantCode, concentration, breakpoints) {
    return new Q.Promise((resolve, reject) => {
      let targetBreakpoint;
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
            resolve(breakpointConcentration);
        });
        reject(constants.MESSAGES.INVALID_MESSAGES.INVALID_CONCENTRATION_RANGE);
      }
    });
  }
}