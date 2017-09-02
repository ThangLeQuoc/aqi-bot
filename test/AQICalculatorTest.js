let chai = require('chai');
let expect = chai.expect;

let AQICalculator = require('../index');

describe('AQICalculator - Calculate AQI', () => {
  it('shouldPrint() show print normally', ()=>{
    AQICalculator.viewFile();
    //expect(AQICalculator.doDummy()).equal('Hello world');
  })
});