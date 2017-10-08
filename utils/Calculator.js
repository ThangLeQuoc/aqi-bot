let Q = require('q');
let constants = require('./Constants');
let truncator = require('./PollutantConcentrationTruncator');

let isValidNowcastData = (concentrations) => {
  let missingData = 0;
  for (let i = 0; i < 3; i++) {
    if (concentrations[i] < 0)
      missingData++;
  }
  return (missingData >= 2) ? false : true;
}

let getWeightFactor = (pollutantCode, concentrations) => {
  let maxConcentration = Number.MIN_VALUE;
  let minConcentration = Number.MAX_VALUE;
  concentrations.forEach((concentration) => {
    if (concentration < 0)
      return;
    else {
      if (concentration > maxConcentration)
        maxConcentration = concentration;
      if (concentration < minConcentration) {
        minConcentration = concentration;
      }
    }
  });

  let range = maxConcentration - minConcentration;
  let weightFactor = 1 - range / maxConcentration;

  if (pollutantCode === constants.POLLUTANT_TYPE.O3) {
    /*No minimum weight factor for Ozone */
    return weightFactor;
  } else {
    /* For Particulate Matter, Minimum weight factor is 0.5 */
    return (weightFactor > 0.5) ? weightFactor : 0.5;
  }
}


module.exports = {
  /**
   * Calculate the Air Quality Index base on concentration
   * @param {concentration} concentration 
   * @param {target breakpoint} breakpoint 
   */
  calculateAQI(concentration, breakpoint) {
    let cHigh = breakpoint.max;
    let cLow = breakpoint.min;
    let iHigh = breakpoint.index.max;
    let iLow = breakpoint.index.min;
    let result = (iHigh - iLow) / (cHigh - cLow) * (concentration - cLow) + iLow;
    return Math.round(result);
  },

  calculateNowcastConcentration(pollutantCode, concentrations) {
    return Q.Promise((resolve, reject) => {
      if (pollutantCode !== constants.POLLUTANT_TYPE.O3 && pollutantCode !== constants.POLLUTANT_TYPE.PM10 && pollutantCode !== constants.POLLUTANT_TYPE.PM25)
        reject('Invalid Nowcast pollutant');
      if (!isValidNowcastData(concentrations))
        reject('Invalid Nowcast Concentration');


      let totalConcentrationWithWeight = 0;
      let weight = getWeightFactor(pollutantCode, concentrations);
      let totalWeight = 0;


      for (let i = 0; i < concentrations.length; i++) {
        if (concentrations[i] < 0)
          continue;
        else {
          totalConcentrationWithWeight += concentrations[i] * Math.pow(weight, i);
          totalWeight += Math.pow(weight, i);
        }
      }
      if (totalWeight != 0) {
        let nowcastConcentration = truncator.truncatePollutantConcentration(pollutantCode, totalConcentrationWithWeight / totalWeight);
        resolve(nowcastConcentration);
      }
      
      resolve("");
    });
  }
}