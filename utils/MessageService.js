/**
 * MessageService is use to resolve AQI Message
 */
module.exports = {
  getGeneralMessage(index, generalMessages) {
    let result = {
      category: undefined,
      message: undefined
    }
    generalMessages.forEach((level) => {
      if (index >= level.index.min && index <= level.index.max) {
        result.category = level.category;
        result.message = level.guidance;
      }
    });
    return result;
  },

  getSpecificMessage(pollutantCode, index, specificMessages) {
    let result = {
      healthEffectsStatements: undefined,
      guidanceStatement: undefined
    }

    let specificMessage;
    specificMessages.forEach((messageByPollutant) => {
      if (messageByPollutant.code == pollutantCode)
        specificMessage = messageByPollutant;
    });
    specificMessage.forEach((message) => {
      if(index >= message.aqiLevel.index.min && index <= message.aqiLevel.index.max){
        result.healthEffectsStatements = message.aqiLevel.healthEffectsStatements;
        result.guidanceStatement = message.aqiLevel.guidance;
      }
    });
    return result;
  }
}