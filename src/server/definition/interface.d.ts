// 下方是空氣品質回傳形狀

type airLocationObject = {
  SiteName: string,
  County: string,
  AQI: number,
  Pollutant: string,
  Status: string,
  SO2: number,
  CO: number,
  CO_8hr: number,
  O3: number,
  O3_8hr: number,
  PM10: number,
  'PM2.5': number,
  NO2: number,
  NOx: number,
  NO: number,
  WindSpeed: number,
  WindDirec: number,
  PublishTime: string,
  'PM2.5_AVG': number,
  PM10_AVG: number,
  SO2_AVG: number,
  Longitude: number,
  Latitude: number,
  SiteId: number
}

type airLocationArray = Array<airLocationObject>;

// 下方式天氣回傳的資料形狀
type weatherLocationElementTimeParameterObject = {
  parameterValue : string,
  parameterName : string,
  parameterUnit : string
}
type weatherLocationElementTimeObject = {
  startTime : string,
  endTime : string,
  parameter : weatherLocationElementTimeParameterObject
}

type weatherLocationElementObject = {
  elementName : string,
  time : Array<weatherLocationElementTimeObject>
}
type weatherLocationObject = {
  locationName : string,
  weatherElement : Array<weatherLocationElementObject>,
};
//