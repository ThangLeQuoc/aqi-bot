let chai = require('chai');
let expect = chai.expect;

const chalk = require('chalk');

let AQIBot = require('../index');

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
});