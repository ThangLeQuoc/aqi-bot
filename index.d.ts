declare module 'aqi-bot' {
  type Result<T extends PollutantType> = {
    pollutant: T
    concentration: number
    aqi: number
    category: string
    healthEffectsStatements: string
    guidanceStatement: string
  }

  export enum PollutantType {
    PM10 = "PM10",
    PM25 = "PM2.5",
    SO2 = "SO2",
    NO2 = "NO2",
    O3 = "O3",
    CO = "CO",
  }

  export namespace AQICalculator {
    export function getAQIResult<T extends PollutantType>(pollutantCode: T, concentration: number): Promise<Result<T>>
    export function getNowcastAQIResult<T extends PollutantType>(pollutantCode: T, concentrations: number[]): Promise<Result<T>>
  }
}
