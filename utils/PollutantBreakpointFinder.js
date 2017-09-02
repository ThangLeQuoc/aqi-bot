let Q = require('q');

let targetBreakpoint;
let targetConcentrationRange;

const chalk = require('chalk');

module.exports = {
  getConcentrationRangeWithAvgConcentration(pollutantCode, concentration, breakpoints) {
    return new Q.Promise((resolve, reject) => {
      breakpoints.forEach((breakpoint) => {
        console.log(chalk.green(breakpoint.code));
        if (breakpoint.code === pollutantCode) {
          targetBreakpoint = breakpoint;
        }
      });
      if (targetBreakpoint === undefined) {
        console.log('reject !');
        reject("Invalid pollutant code");

      } else {
        targetBreakpoint.concentrations.forEach((breakpointConcentration) => {
          if (concentration >= breakpointConcentration.min && concentration <= breakpointConcentration.max)
            resolve(concentration);
        });
        reject("Invalid concentration range");
      }
    });
  }
}