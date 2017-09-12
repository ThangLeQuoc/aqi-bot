

module.exports = {
  /**
   * Calculate the Air Quality Index base on concentration
   * @param {concentration} concentration 
   * @param {target breakpoint} breakpoint 
   */
  calculateAQI  (concentration, breakpoint) {
    let cHigh = breakpoint.max;
    let cLow = breakpoint.min;
    let iHigh = breakpoint.index.max;
    let iLow = breakpoint.index.min;
    let result = (iHigh-iLow)/(cHigh-cLow) * (concentration - cLow) + iLow;
    return Math.round(result);
  }
}