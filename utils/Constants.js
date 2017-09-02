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

let category = {
  NONE: "None",
  GOOD: "Good",
  MODERATE: "Moderate",
  UNHEALTHY_FOR_SENSITIVE_GROUPS: "Unhealthy for Sensitive Groups",
  UNHEALTHY: "Unhealthy",
  VERY_UNHEALTHY: "Very Unhealthy",
  HAZARDOUS: "Hazardous"
}

module.exports = {
  POLLUTANT_TYPE: pollutantCodes,
  MESSAGES: messages,
  AQI_CATEGORY: category
}