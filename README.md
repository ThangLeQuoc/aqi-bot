<h1 align="center">
	<br>
	<img width="320" src="http://aqicn.org/aqicn/view/experiments/images/aqi-transparent.png">
	<br>
  <br>
</h1>

# NPM AQI Calculator
[![npm version](https://badge.fury.io/js/aqi-bot.svg)](https://badge.fury.io/js/aqi-bot)
### Foreword
All methods, constraints use in this project follows **US EPA AQI Calculation Method** (which includes breakpoint table and calculation formulas) . Since each country issues different AQI calculation methods, using this package might be inappropriate, consider your usage.

This project is intended to community target for free use. The author is not associated with USA government, nor United States Environmental Protection Agency (a.k.a **US EPA**)

## Highlights
- Calculate AQI from raw concentration
- The result from calculation includes Air Quality Index, AQI Category, General Message, Specific Health Effects Statements for the pollutant and the corresponding guidance message
- Support various pollutants
- Support Nowcast Concentration
- The AQI Calculation approach issued by US EPA by far is the most sensible way I've seen after working with various AQI calculation formulas.


### Support the following pollutants

| Pollutant  | Scientific name| Unit of Measurement |Input Code Usage |Regular Calculation Support |Nowcast Support | Health Effects Statements | Guidance Message|
| ---- |:-------------:|:-------------:|:-------------:|:-------------:|-------------:|-------------:|-------------:|
| PM10      |  10 μm Particle Pollutant  | μg/m3| PM10 | :heavy_check_mark:| :heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| PM2.5      |  2.5 μm Particle Pollutant  | μg/m3| PM2.5 |  :heavy_check_mark:| :heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| O3     |  Ozone  | ppb| O3 | :heavy_check_mark:| :heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| CO     |  Carbon Monoxide  | ppb| CO | :heavy_check_mark:|:x:|:heavy_check_mark:|:heavy_check_mark:|
| SO2     |  Sulfur Dioxide  | ppb| SO2 | :heavy_check_mark:| :x:|:heavy_check_mark:|:heavy_check_mark:|
| NO2     |  Nitrogen Dioxide  | ppb| NO2 | :heavy_check_mark:| :x:|:heavy_check_mark:|:heavy_check_mark:|
## Installation
```
npm install aqi-bot --save
```

Extract the `aqi-bot` to use it
```
let aqibot = require('aqi-bot');
```
## Quick Usage

#### For Regular AQI Calculation
2 required parameter is *pollutant code* and *concentration*. The unit of measurement for the pollutant code is as defined in the pollutants specification table.

```
aqibot.AQICalculator.getAQIResult("PM10", 125).then((result) => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  })
```

Or you might use the pollutant code constants from the *aqibot*:
`aqibot.AQICalculator.getAQIResult(aqibot.PollutantType.PM10, concentration)`

And the `result` object there contains all the information that you need

```
{
    "pollutant": "PM10",
    "concentration": "125",
    "aqi": 86,
    "category": "Moderate",
    "generalMessage": "Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion",
    "healthEffectsStatements": "Respiratory symptoms possible in unusually sensitive individuals; possible aggravation of heart or lung disease in people with cardiopulmonary disease and older adults",
    "guidanceStatement": "Unusually sensitive people should consider reducing prolonged or heavy exertion"
}
```

#### For Nowcast AQI Calculation
2 required parameter is *pollutant code* and an array of average *concentration* for each hour recorded (more explanation below). The unit of measurement for the pollutant code is as defined in the pollutants specification table.

```
/* Example Data for Nowcast PM2.5 12h period - 30.5, 12.5, 14.3, 30, 32.4, 31.1, 28.2, 30.7, 32.8, 32.6, 33.1, 28.5 */

let concentrationData = [30.5, 12.5, 14.3, 30, 32.4, 31.1, 28.2, 30.7, 32.8, 32.6, 33.1, 28.5];

AQIBot.AQICalculator.getNowcastAQIResult(PollutantType.PM25, concentrationData).then((result)=>{
  console.log(result);
}).catch(err =>{
  console.log(err);
})
```

Please note that the concentration in `result` object here is the *Nowcast Concentration*
```
{
    "pollutant": "PM2.5",
    "concentration": 24,
    "aqi": 76,
    "category": "Moderate",
    "generalMessage": "Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion",
    "healthEffectsStatements": "Respiratory symptoms possible in unusually sensitive individuals; possible aggravation of heart or lung disease in people with cardiopulmonary disease and older adults",
    "guidanceStatement": "Unusually sensitive people should consider reducing prolonged or heavy exertion"
}
```

The first number in the array is the average concentration value of the selected hour, and the upcoming element in the array represent one step of hour before the selected hour.

If the hour doesn't have data, replace missing data in the hour with **-1**
##### Example Nowcast Dataset for PM10: (have some missing data in hour)
| Hour | Avg Concentration
| ---- |:-------------:|
| 14      | 64 ppb |
| 13      | 63 ppb |
| 12      | ---- |
| 11      | 77 ppb |
| 10      | 65 ppb |
| 9      | ---- |
| 8      | 70 ppb |
| 7      | 71 ppb |
| 6      | ---- |
| 5      | 57 ppb|
| 4      | 58 ppb|
| 3      | 64 ppb|

Presume that you want to calculate Nowcast AQI for PM10 at **14**, the data array should be

```
  let concentrationData = [ 64, 63, -1, 77, 65, -1, 70, 71, -1, 57, 58, 64 ];

  AQIBot.AQICalculator.getNowcastAQIResult(PollutantType.PM10, concentrationData).then((result)=>{
    console.log(result);
  }).catch(err =>{
    console.log(err);
})
```

```
{
    "pollutant": "PM10",
    "concentration": 66,
    "aqi": 56,
    "category": "Moderate",
    "generalMessage": "Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion",
    "healthEffectsStatements": "Respiratory symptoms possible in unusually sensitive individuals; possible aggravation of heart or lung disease in people with cardiopulmonary disease and older adults",
    "guidanceStatement": "Unusually sensitive people should consider reducing prolonged or heavy exertion"
}
```

# AQI Calculation Turtorial
## US EPA AQI Breakpoint
<img src="https://image.ibb.co/gvrFc5/2017_07_20_15_22_21.png" alt="2017_07_20_15_22_21" border="0">

###### Image from Wikipedia

## Calculation Formula

The AQI is the highest value calculated for each pollutant as follows:

1. 	Identify the highest concentration among all of the monitors within each reporting area and truncate as follows:

<img width="400" src="https://image.ibb.co/je0rH5/2017_07_20_15_27_19.png" alt="2017_07_20_15_27_19" border="0">

2. 	Using US EPA AQI Breakpoint, find the two breakpoints that contain the concentration.
3. 	Using AQI Equation , calculate the index.
4. 	Round the index to the nearest integer.
 

<img width="600" src="https://image.ibb.co/n6w3VQ/2017_07_20_15_25_59.png" alt="2017_07_20_15_25_59" border="0">

### Nowcast for PM and Ozone
The concentration of PM10, PM2.5 is so dynamic since wind can completely clean the air in less
than 30 minutes, or a wildfire can raise the concentration with a very fast rate in an hour. So
Nowcast is introduced, it mainly focus on detect the average changing of the period hour and
perform counter balancing.

<img  width="800" src="https://image.ibb.co/gcrCqQ/2017_07_20_15_30_08.png" alt="2017_07_20_15_30_08" border="0">

#### Nowcast Rules
<img width="800" src="https://image.ibb.co/ntF0c5/image.png" alt="image" border="0">

##### Handling Missing data
To compute a valid NowCast, you must have at least two of the most recent 3 hours

<img width="300" src="https://image.ibb.co/hxVYx5/image.png" alt="image" border="0">

## Extra Documents and Tools that you might needs
[Air Now AQI Calculator: Concentration to AQI](https://airnow.gov/index.cfm?action=resources.conc_aqi_calc)

[Air Now Nowcast Calculator](https://www3.epa.gov/airnow/aqicalctest/nowcast.htm)

[Daily and Hourly AQI - PM2.5 and PM10](https://forum.airnowtech.org/t/daily-and-hourly-aqi-pm2-5-and-pm10/171)

[Daily and Hourly AQI - PM2.5 and PM10](https://forum.airnowtech.org/t/daily-and-hourly-aqi-ozone/170)

[US EPA AQI Brochure](https://www3.epa.gov/airnow/aqi_brochure_02_14.pdf)

[US EPA AQI Technical Assistance Document](https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf)

[US EPA Nowcast Overview](https://www3.epa.gov/airnow/ani/pm25_aqi_reporting_nowcast_overview.pdf)

###### Demonstration images for nowcast in this tutorial are from [US EPA Nowcast Overview](https://www3.epa.gov/airnow/ani/pm25_aqi_reporting_nowcast_overview.pdf) document
