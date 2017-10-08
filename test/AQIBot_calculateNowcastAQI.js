let chai = require('chai');
let expect = chai.expect;

const chalk = require('chalk');

let calculator = require('../utils/Calculator');
let constants = require('../utils/Constants');


describe('AQIBot - Calculate Nowcast Concentration', () => {
  it('should return nowcast concentration of PM10 at 67 with fully loaded data', () => {
    let concentrationData = [64, 63, 72, 77, 65, 61, 70, 71, 64, 57, 58, 64];
    let expectedNowcastConcentration = 67;

    return calculator.calculateNowcastConcentration(constants.POLLUTANT_TYPE.PM10, concentrationData).then(nowcastConcentration => {
      expect(nowcastConcentration).to.equal(expectedNowcastConcentration);
    });
  });

  it('should return nowcast concentration of PM10 at 48 with some missing data', () => {
    let concentrationData = [64, -1, 62, 77, 65, 61, 70, 71, 64, 57, 58, 64];
    let expectedNowcastConcentration = 66;
    return calculator.calculateNowcastConcentration(constants.POLLUTANT_TYPE.PM10, concentrationData).then(nowcastConcentration => {
      expect(nowcastConcentration).to.equal(expectedNowcastConcentration);
    });
  });

  it('invalid nowcast concentration case ', () => {
    let concentrationData = [-1, -1, -1, 77, 65, 61, 70, 71, 64, 57, 58, 64];
    return calculator.calculateNowcastConcentration(constants.POLLUTANT_TYPE.PM10, concentrationData).catch(err => {
      expect(err).to.equal('Invalid Nowcast Concentration');
    });

    concentrationData = [64, -1, -1, 77, 65, 61, 70, 71, 64, 57, 58, 64];
    return calculator.calculateNowcastConcentration(constants.POLLUTANT_TYPE.PM10, concentrationData).catch(err => {
      expect(err).to.equal('Invalid Nowcast Concentration');
    });
  });

  it('should return nowcast concentration of PM2.5 at 30.1', () => {
    let concentrationData = [30.5, 28.8, 29.5, 30, 32.4, 31.1, 28.2, 30.7, 32.8, 32.6, 33.1, 28.5];
    let expectedNowcastConcentration = 30.4;
    return calculator.calculateNowcastConcentration(constants.POLLUTANT_TYPE.PM25, concentrationData).then(nowcastConcentration => {
      expect(nowcastConcentration).to.equal(expectedNowcastConcentration);
    });
  });

  





})