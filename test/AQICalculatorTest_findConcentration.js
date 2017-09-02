let chai = require('chai');
let expect = chai.expect;
let constants = require('../utils/Constants');
let AQIBot = require('../index');

describe('AQICalculator - Find concentration', () => {
  it('should throw invalid pollutant code message when put a pollutant code which is not in the breakpoints list', () => {
    return AQIBot.AQICalculator.getRegularAQIResult("PM101", 12).catch((message) => {
      expect(message).to.equal(constants.MESSAGES.INVALID_MESSAGES.INVALID_POLLUTANT_CODE);
    });
  });
  it('should throw invalid concentration message when put a concentration which is not in the breakpoints list', () => {
    return AQIBot.AQICalculator.getRegularAQIResult(AQIBot.PollutantType.PM10, 12).catch((message) => {
      expect(message).to.equal('Invalid pollutant code');
    });
  });
});