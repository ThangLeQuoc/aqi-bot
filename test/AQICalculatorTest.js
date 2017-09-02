let chai = require('chai');
let expect = chai.expect;
let helper = require('../utils/DataHelper');
let AQIBot = require('../index');

describe('AQICalculator - Find concentration', () => {
  it('should throw invalid concentration message when put a concentration which is not in the breakpoints list', () => {
    
    return AQIBot.AQICalculator.getRegularAQIResult("lmao", 12).catch((message) => {
      expect(message).to.equal('Invalid pollutant code');
    });

    expect(helper.POLLUTANT_TYPE.PM10).equal("PM10");

  })
});