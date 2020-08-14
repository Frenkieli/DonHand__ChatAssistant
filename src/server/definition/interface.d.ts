type airObject = {
  Status: string,
  SiteName: string,
  County: string,
  AQI: number,  // 他其實是字串型別的數字
}



// 下方式天氣回傳的資料形狀
type weatherLocationElementTimeParameterObject = {
  parameterValue : string,
  parameterName : string
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