let pollutantCodes = {
  PM10: "PM10",
  PM25: "PM2.5",
  SO2: "SO2",
  NO2: "NO2",
  O3: "O3",
  CO: "CO"
}

let messages = {
  INVALID_MESSAGES: {
    INVALID_POLLUTANT_CODE: "Invalid pollutant code",
    INVALID_CONCENTRATION_RANGE: "Invalid concentration range"
  }
}

module.exports = {
  POLLUTANT_TYPE: pollutantCodes,
  MESSAGES: messages
}