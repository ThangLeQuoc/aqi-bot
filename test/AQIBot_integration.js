let chai = require('chai');
let expect = chai.expect;

const chalk = require('chalk');

let AQIBot = require('../index');

let constants = require('../utils/Constants');

describe('AQIBot - Integration Test', () => {
  it('should get correct result for PM10 at 32 ug/m3', () => {
    return AQIBot.AQICalculator.getAQIResult(AQIBot.PollutantType.PM10, 32).then((result) => {
      expect(result.pollutant).to.equal(AQIBot.PollutantType.PM10);
      
    })
  })
});