let chai = require('chai');
let fs = require('fs');
let expect = chai.expect;
let chalk = require('chalk');

let AQIBot = require('../index');
let pollutantBreakpointFinder = require('../utils/PollutantBreakpointFinder');

let constants = require('../utils/Constants');
let breakpoints = JSON.parse(fs.readFileSync('./resources/aqi-breakpoint.json', 'utf8'));

describe('AQICalculator - Find concentration', () => {
  it('should throw invalid pollutant code message when put a pollutant code which is not in the breakpoints list', () => {
    return AQIBot.AQICalculator.getAQIResult("PM101", 12).catch((message) => {
      expect(message).to.equal(constants.MESSAGES.INVALID_MESSAGES.INVALID_POLLUTANT_CODE);
    });
  });

  it('should throw invalid concentration message when put a concentration which is not in the breakpoints list', () => {
    return AQIBot.AQICalculator.getAQIResult(AQIBot.PollutantType.PM10, 1245000).catch((message) => {
      expect(message).to.equal(constants.MESSAGES.INVALID_MESSAGES.INVALID_CONCENTRATION_RANGE);
    });
  });

  it('should get correct PM2.5 breakpoint range with PM2.5 at 235 ug/m3', () => {
    return pollutantBreakpointFinder.getConcentrationRangeWithAvgConcentration(AQIBot.PollutantType.PM25, 235, breakpoints).then((result) => {
      let expectedBreakpointConcentration = {
        "min": 150.5,
        "max": 250.4,
        "index": {
          "min": 201,
          "max": 300
        }
      };
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expectedBreakpointConcentration));
    });
  });

  it('should get correct PM10 breakpoint range with PM10 at 400 ug/m3', () => {
    return pollutantBreakpointFinder.getConcentrationRangeWithAvgConcentration(AQIBot.PollutantType.PM10, 400, breakpoints).then((result) => {
      let expectedBreakpointConcentration = {
        "min": 355,
        "max": 424,
        "index": {
          "min": 201,
          "max": 300
        }
      };
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expectedBreakpointConcentration));
    });
  });

  it('should get correct PM10 breakpoint range with PM10 at 135 ug/m3', () => {
    return pollutantBreakpointFinder.getConcentrationRangeWithAvgConcentration(AQIBot.PollutantType.PM10, 135, breakpoints).then((result) => {
      let expectedBreakpointConcentration = {
        "min": 55,
        "max": 154,
        "index": {
          "min": 51,
          "max": 100
        }
      };
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expectedBreakpointConcentration));
    });
  });
});