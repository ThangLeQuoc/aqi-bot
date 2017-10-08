let chai = require('chai');
let expect = chai.expect;

const chalk = require('chalk');

let AQIBot = require('../index');

let PollutantType = AQIBot.PollutantType;

let constants = require('../utils/Constants');

describe('AQIBot - Integration Test', () => {
  it('should get correct result for PM10 at 32 ug/m3', () => {
    return AQIBot.AQICalculator.getAQIResult(AQIBot.PollutantType.PM10, 32).then((result) => {
      expect(result.pollutant).to.equal(AQIBot.PollutantType.PM10);
      expect(result.concentration).to.equal(32);
      expect(result.aqi).to.equal(30);
      expect(result.category).to.equal(constants.AQI_CATEGORY.GOOD);
      expect(result.generalMessage).to.equal(constants.MESSAGES.GENERAL_MESSAGES.GOOD);
      expect(result.guidanceStatement).to.equal(constants.MESSAGES.SPECIFIC_MESSAGES.PM10.GOOD.GUIDANCE);
      expect(result.healthEffectsStatements).to.equal(constants.MESSAGES.SPECIFIC_MESSAGES.PM10.GOOD.HEALTH_EFFECTS_STATEMENTS);
    });
  });

  it('should get correct result for PM2.5 at 9.6 ug/m3', () => {
    return AQIBot.AQICalculator.getAQIResult(PollutantType.PM25, 9.6).then((result) => {
      expect(result.pollutant).to.equal(PollutantType.PM25);
      expect(result.concentration).to.equal(9.6);
      expect(result.aqi).to.equal(40)
      expect(result.category).to.equal(constants.AQI_CATEGORY.GOOD);
      expect(result.generalMessage).to.equal(constants.MESSAGES.GENERAL_MESSAGES.GOOD);
      expect(result.guidanceStatement).to.equal(constants.MESSAGES.SPECIFIC_MESSAGES.PM25.GOOD.GUIDANCE);
      expect(result.healthEffectsStatements).to.equal(constants.MESSAGES.SPECIFIC_MESSAGES.PM25.GOOD.HEALTH_EFFECTS_STATEMENTS);
    });
  });

  it('should get correct result for O3 at 10 ppb', () => {
    return AQIBot.AQICalculator.getAQIResult(PollutantType.O3, 10).then((result) => {
      expect(result.pollutant).to.equal(PollutantType.O3);
      expect(result.concentration).to.equal(10);
      expect(result.aqi).to.equal(9);
      expect(result.category).to.equal(constants.AQI_CATEGORY.GOOD);
      expect(result.generalMessage).to.equal(constants.MESSAGES.GENERAL_MESSAGES.GOOD);
      expect(result.guidanceStatement).to.equal(constants.MESSAGES.SPECIFIC_MESSAGES.O3.GOOD.GUIDANCE);
      expect(result.healthEffectsStatements).to.equal(constants.MESSAGES.SPECIFIC_MESSAGES.O3.GOOD.HEALTH_EFFECTS_STATEMENTS);
    });
  });

  it('should get correct result for O3 at 10 ppb', () => {
    return AQIBot.AQICalculator.getAQIResult(PollutantType.O3, 10).then((result) => {
      expect(result.pollutant).to.equal(PollutantType.O3);
      expect(result.concentration).to.equal(10);
      expect(result.aqi).to.equal(9);
      expect(result.category).to.equal(constants.AQI_CATEGORY.GOOD);
      expect(result.generalMessage).to.equal(constants.MESSAGES.GENERAL_MESSAGES.GOOD);
      expect(result.guidanceStatement).to.equal(constants.MESSAGES.SPECIFIC_MESSAGES.O3.GOOD.GUIDANCE);
      expect(result.healthEffectsStatements).to.equal(constants.MESSAGES.SPECIFIC_MESSAGES.O3.GOOD.HEALTH_EFFECTS_STATEMENTS);
    });
  });

  it('should get correct result for PM2.5 when calculate nowcast with some missing data', () => {
    let concentrationData = [30.5, 12.5, -1, 30, 32.4, 31.1, 28.2, 30.7, 32.8, 32.6, 33.1, 28.5];
    return AQIBot.AQICalculator.getNowcastAQIResult(PollutantType.PM25, concentrationData).then(result => {
      expect(result.concentration).to.equal(25.4);
      expect(result.aqi).to.equal(79);
      expect(result.category).to.equal(constants.AQI_CATEGORY.MODERATE);
    });
  });
});