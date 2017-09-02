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
  },
  GENERAL_MESSAGES: {
    GOOD: "None",
    MODERATE: "Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion",
    UNHEALTHY_FOR_SENSITIVE_GROUPS: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion",
    UNHEALTHY: "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion",
    VERY_UNHEALTHY: "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion",
    HAZARDOUS: "Everyone should avoid all outdoor exertion"
  },
  SPECIFIC_MESSAGES: {
    PM10: {
      GOOD: {
        HEALTH_EFFECTS_STATEMENTS: "None",
        GUIDANCE: "None"
      },
      MODERATE: {
        HEALTH_EFFECTS_STATEMENTS: "Respiratory symptoms possible in unusually sensitive individuals; possible aggravation of heart or lung disease in people with cardiopulmonary disease and older adults",
        GUIDANCE: "Unusually sensitive people should consider reducing prolonged or heavy exertion"
      },
      UNHEALTHY_FOR_SENSITIVE_GROUPS: {
        HEALTH_EFFECTS_STATEMENTS: "Increasing likelihood of respiratory symptoms in sensitive groups including older adults, children, and people of lower socioeconomic status; aggravation of heart or lung disease and premature mortality in people with heart or lung disease",
        GUIDANCE: "People with heart or lung disease, older adults, children, and people of lower socioeconomic status should reduce prolonged or heavy exertion"
      },
      UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "Increased aggravation of respiratory symptoms in sensitive groups including older adults, children, and people of lower socioeconomic status; increased aggravation of heart or lung disease and premature mortality in people with heart or lung disease; increased respiratory effects in general population",
        GUIDANCE: "People with heart or lung disease, older adults, children, and people of lower socioeconomic status should avoid prolonged or heavy exertion; everyone else should reduce prolonged or heavy exertion"
      },
      VERY_UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "Significant aggravation of respiratory symptoms in sensitive groups including older adults, children, and people of lower socioeconomic status; significant aggravation of heart or lung disease and premature mortality in people with heart or lung disease; significant increase in respiratory effects in general population",
        GUIDANCE: "People with heart or lung disease, older adults, children, and people of lower socioeconomic status should avoid all physical activity outdoors. Everyone else should avoid prolonged or heavy exertion"
      },
      HAZARDOUS: {
        HEALTH_EFFECTS_STATEMENTS: "Serious aggravation of respiratory symptoms in sensitive groups including older adults, children, and people of lower socioeconomic status; serious aggravation of heart or lung disease and premature mortality in people with heart or lung disease; serious risk of respiratory effects in general population",
        GUIDANCE: "Everyone should avoid all physical activity outdoors; people with heart or lung disease, older adults, children, and people of lower socioeconomic status should remain indoors and keep activity levels low"
      }
    },
    PM25: {
      GOOD: {
        HEALTH_EFFECTS_STATEMENTS: "None",
        GUIDANCE: "None"
      },
      MODERATE: {
        HEALTH_EFFECTS_STATEMENTS: "Respiratory symptoms possible in unusually sensitive individuals; possible aggravation of heart or lung disease in people with cardiopulmonary disease and older adults",
        GUIDANCE: "Unusually sensitive people should consider reducing prolonged or heavy exertion"
      },
      UNHEALTHY_FOR_SENSITIVE_GROUPS: {
        HEALTH_EFFECTS_STATEMENTS: "Increasing likelihood of respiratory symptoms in sensitive groups including older adults, children, and people of lower socioeconomic status; aggravation of heart or lung disease and premature mortality in people with heart or lung disease",
        GUIDANCE: "People with heart or lung disease, older adults, children, and people of lower socioeconomic status should reduce prolonged or heavy exertion"
      },
      UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "Increased aggravation of respiratory symptoms in sensitive groups including older adults, children, and people of lower socioeconomic status; increased aggravation of heart or lung disease and premature mortality in people with heart or lung disease; increased respiratory effects in general population",
        GUIDANCE: "People with heart or lung disease, older adults, children, and people of lower socioeconomic status should avoid prolonged or heavy exertion; everyone else should reduce prolonged or heavy exertion"
      },
      VERY_UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "Significant aggravation of respiratory symptoms in sensitive groups including older adults, children, and people of lower socioeconomic status; significant aggravation of heart or lung disease and premature mortality in people with heart or lung disease; significant increase in respiratory effects in general population",
        GUIDANCE: "People with heart or lung disease, older adults, children, and people of lower socioeconomic status should avoid all physical activity outdoors. Everyone else should avoid prolonged or heavy exertion"
      },
      HAZARDOUS: {
        HEALTH_EFFECTS_STATEMENTS: "Serious aggravation of respiratory symptoms in sensitive groups including older adults, children, and people of lower socioeconomic status; serious aggravation of heart or lung disease and premature mortality in people with heart or lung disease; serious risk of respiratory effects in general population",
        GUIDANCE: "Everyone should avoid all physical activity outdoors; people with heart or lung disease, older adults, children, and people of lower socioeconomic status should remain indoors and keep activity levels low"
      }
    },
    O3: {
      GOOD: {
        HEALTH_EFFECTS_STATEMENTS: "None",
        GUIDANCE: "None"
      },
      MODERATE: {
        HEALTH_EFFECTS_STATEMENTS: "Unusually sensitive individuals may experience respiratory symptoms",
        GUIDANCE: "Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion"
      },
      UNHEALTHY_FOR_SENSITIVE_GROUPS: {
        HEALTH_EFFECTS_STATEMENTS: "Increasing likelihood of respiratory symptoms and breathing discomfort in people with lung disease (such as asthma), children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients",
        GUIDANCE: "People with lung disease (such as asthma), children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients should reduce prolonged or heavy outdoor exertion"
      },
      UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "Greater likelihood of respiratory symptoms and breathing in people with lung disease (such as asthma), children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients; possible respiratory effects in general population",
        GUIDANCE: "People with lung disease (such as asthma), children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients should avoid prolonged or heavy outdoor exertion; everyone else should reduce prolonged or heavy outdoor exertion"
      },
      VERY_UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "Increasingly severe symptoms and impaired breathing likely in people with lung disease (such as asthma), children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients; increasing likelihood of respiratory effects in general population",
        GUIDANCE: "People with lung disease (such as asthma), children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients should avoid all outdoor exertion; everyone else should reduce outdoor exertion"
      },
      HAZARDOUS: {
        HEALTH_EFFECTS_STATEMENTS: "Severe respiratory effects and impaired breathing likely in people with lung disease (such as asthma), children, older adults, people who are active outdoors (including outdoor workers), people with certain genetic variants, and people with diets limited in certain nutrients; increasingly severe respiratory effects likely in general population",
        GUIDANCE: "Everyone should avoid all outdoor exertion"
      }
    },
    CO: {
      GOOD: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      MODERATE: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      UNHEALTHY_FOR_SENSITIVE_GROUPS: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      VERY_UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      HAZARDOUS: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      }
    },
    NO2: {
      GOOD: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      MODERATE: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      UNHEALTHY_FOR_SENSITIVE_GROUPS: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      VERY_UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      HAZARDOUS: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      }
    },
    SO2: {
      GOOD: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      MODERATE: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      UNHEALTHY_FOR_SENSITIVE_GROUPS: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      VERY_UNHEALTHY: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      },
      HAZARDOUS: {
        HEALTH_EFFECTS_STATEMENTS: "",
        GUIDANCE: ""
      }
    }
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
