let chai = require('chai');
let expect = chai.expect;
const chalk = require('chalk');

let airbot = require('../index');
let calculator = require('../utils/Calculator');
let constants = require('../utils/Constants');

describe('AQIBot - Get Message on AQI', () => {
  it('should', () => {
    airbot.AQICalculator.getAQIResult(airbot.PollutantType.PM10, 135);
    
  })
})