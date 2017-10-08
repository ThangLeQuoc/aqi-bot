let constants = require('./Constants');
let PollutantType = constants.POLLUTANT_TYPE;


let self = module.exports = {
  truncatePollutantConcentration(pollutantCode, concentration) {
    if (pollutantCode === PollutantType.PM10 || pollutantCode === PollutantType.SO2 || pollutantCode === PollutantType.NO2)
      return Math.round(concentration);
    else if (pollutantCode === PollutantType.CO || pollutantCode === PollutantType.PM25)
      return Math.round(concentration * 10) / 10;
    else return Math.round(concentration * 1000) / 1000;
  }
}