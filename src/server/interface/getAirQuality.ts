/**
 * @description 用來獲取空氣品質使用
 * @author frenkie
 * @date 2020-08-12
 */
import axios, { AxiosStatic } from 'axios';


class AirQuality{
  public readonly axios : AxiosStatic;
  public data : Array<any> | null;
  public dataTime : NodeJS.Timeout;
  public cooldown : boolean;
  constructor(){
    this.axios = axios;
    this.data = null;
    this.dataTime = setTimeout(() => {}, 0);;
    this.cooldown = false;
  }
  public getAirQuality(cityName: string): Promise<Array<airObject>>{
    let vm = this;
    return new Promise(async (resolve, reject)=>{
      console.log('開始獲取品質資料');
      if(vm.data){
        console.log('直接回覆暫存資料');
        // 這邊這樣設計是因為空氣有即時性需求，但是如果在資料刪除到獲取過程制中被頻繁獲取的話會造成IP被鎖，所以這邊作出資料５分鐘後消失但冷卻４分鐘
        // 在差異的這一分鐘內如果被呼叫就先吐５分鐘前的資料，並執行獲取最新資料，獲取完成後將資料更新進入新的冷卻計算
        // 利用暫存資料減少伺服器向公開資料要資料的次數
        if(!vm.cooldown){
          vm.getAirQualityData();
        }
        resolve(vm.filtersAirQuality(cityName));
      }else{
        await vm.getAirQualityData();
        resolve(vm.filtersAirQuality(cityName));
      }
    })
  }
  private filtersAirQuality(cityName: string): Array<airObject>{
    let vm = this;
    if(!vm.data) vm.data = [];
    let data = vm.data.filter(v=>{
      return v.County === cityName
    }).sort((a, b)=>{
      return a.AQI >= b.AQI ? -1 : 1
    })
    return data
  }

  private getAirQualityData() : Promise<object>{
    let vm = this;
    return new Promise((resolve, reject)=>{
      axios.get('https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259?sort=AQI&offset=0&limit=1000').then(res=>{
        console.log('獲取空氣品質資料');
        vm.data = res.data.result.records;
        vm.cooldown = true;
        setTimeout(() => {
          vm.cooldown = false;
        }, 4 * 60 * 1000);
        clearTimeout(vm.dataTime);
        vm.dataTime = setTimeout(() => {
          vm.data = null;
        }, 5 * 60 * 1000);
        resolve(res.data.records);
      }).catch((e)=>{
        reject('獲取空氣品質失敗:' + e)
      })
    })
  }
}

let airQuality = new AirQuality;

export default airQuality.getAirQuality.bind(airQuality);