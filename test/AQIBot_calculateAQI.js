let chai = require('chai');
let expect = chai.expect;
const chalk = require('chalk');

let airbot = require('../index');
let calculator = require('../utils/Calculator');
let constants = require('../utils/Constants');

describe('AQIBot - Calculate AQI', () => {
  it('should get AQI of PM10 is 91 with concentration at 135 ug/m3', () => {
    let concentration = 135;
    let breakpoint = {
      "min": 55,
      "max": 154,
      "index": {
        "min": 51,
        "max": 100
      }
    };
    expect(calculator.calculateAQI(concentration, breakpoint)).to.equal(91);
  });

  it('should get AQI of PM10 is 111 with concentration at 175 ug/m3', () => {
    let concentration = 175;
    let breakpoint = {
      "min": 155,
      "max": 254,
      "index": {
        "min": 101,
        "max": 150
      }
    };
    expect(calculator.calculateAQI(concentration, breakpoint)).to.equal(111);
  });

  it('should get AQI of PM10 is 204 with concentration at 357 ug/m3', () => {
    let concentration = 357;
    let breakpoint = {
      "min": 355,
      "max": 424,
      "index": {
        "min": 201,
        "max": 300
      }
    }
    expect(calculator.calculateAQI(concentration, breakpoint)).to.equal(204);
  });
});