/**
 * @description 用來獲取天氣和空氣品質的功能
 * @author frenkie
 * @date 2020-08-26
 */
import axiosItem from '@@interModules/axios';

class AirData{
  public airData : Array<any> | null;
  public weatherData : Array<any> | null;
  public dataTime : NodeJS.Timeout;
  public cooldown : boolean;
  constructor(){
    this.airData = null;
    this.weatherData = null;
    this.dataTime = setTimeout(() => {}, 0);;
    this.cooldown = false;
  }
  public getAirData(cityName: string): Promise<Array<any>>{
    let vm = this;
    return new Promise(async (resolve, reject)=>{
      if(vm.airData){
        console.log('直接回覆暫存資料');
        if(!vm.cooldown){
          vm.getAirQualityData();
          vm.getWeatherData();
        }
        resolve([vm.filtersWeather(cityName), vm.filtersAirQuality(cityName)]);
      }else{
        Promise.all([vm.getAirQualityData(), vm.getWeatherData()]).then((res :any)=>{
          vm.cooldown = true;
          setTimeout(() => {
            vm.cooldown = false;
          }, 25 * 60 * 1000);
          clearTimeout(vm.dataTime);
          vm.dataTime = setTimeout(() => {
            vm.airData = null;
            vm.weatherData = null;
          }, 30 * 60 * 1000);
          vm.airData = res[0];
          vm.weatherData = res[1];
          resolve([vm.filtersWeather(cityName), vm.filtersAirQuality(cityName)]);
        })
      }
    })
  }
  private filtersWeather(cityName: string): Array<weatherLocationElementObject> {
    let vm = this;
    if (!vm.weatherData) vm.weatherData = [];
    let weatherData = vm.weatherData.filter(v => {
      return v.locationName === cityName
    }).map((value) => {
      return value.weatherElement
    })[0]
    return weatherData
  }
  private filtersAirQuality(cityName: string): Array<airObject>{
    let vm = this;
    if(!vm.airData) vm.airData = [];
    let airData = vm.airData.filter(v=>{
      return v.County === cityName
    }).sort((a, b)=>{
      return a.AQI >= b.AQI ? -1 : 1
    })
    return airData
  }
  private getAirQualityData() : Promise<any>{
    let vm = this;
    return new Promise((resolve, reject)=>{
      axiosItem.get('https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259?sort=AQI&offset=0&limit=1000').then(res=>{
        console.log('獲取空氣品質資料');
        resolve(res.data.result.records);
      }).catch((e)=>{
        reject('獲取空氣品質失敗:' + e)
      })
    })
  }
  private getWeatherData(): Promise<Array<weatherLocationObject>> {
    let vm = this;
    return new Promise((resolve, reject) => {
      axiosItem.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-9C6EB37A-93A5-4A81-ABC0-CDD0B7CB406C&format=JSON&sort=time').then(res => {
        console.log('獲取天氣資料');
        resolve(res.data.records.location);
      }).catch((e) => {
        reject('獲取天氣失敗:' + e)
      })
    })
  }
}

let airData = new AirData;

export default airData.getAirData.bind(airData);