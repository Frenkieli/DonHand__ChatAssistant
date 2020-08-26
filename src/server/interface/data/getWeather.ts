/**
 * @description 用來獲取天氣預報
 * @author frenkie
 * @date 2020-08-12
 */
import axiosItem from '@@interModules/axios';
class Weather {
  public data: Array<weatherLocationObject> | null;
  public dataTime: NodeJS.Timeout;
  public cooldown: boolean;
  constructor() {
    this.data = null;
    this.dataTime = setTimeout(() => { }, 0);;
    this.cooldown = false;
  }
  public getWeather(cityName: string): Promise<Array<weatherLocationElementObject>> {
    let vm = this;
    return new Promise(async (resolve, reject) => {
      console.log('開始獲取天氣資料');
      if (vm.data) {
        console.log('直接回覆天氣暫存資料');
        // 這邊這樣設計是因為空氣有即時性需求，但是如果在資料刪除到獲取過程制中被頻繁獲取的話會造成IP被鎖，所以這邊作出資料60分鐘後消失但冷卻55分鐘
        // 在差異的這5分鐘內如果被呼叫就先吐60分鐘前的資料，並執行獲取最新資料，獲取完成後將資料更新進入新的冷卻計算
        // 利用暫存資料減少伺服器向公開資料要資料的次數
        if (!vm.cooldown) {
          vm.getWeatherData();
        }
        resolve(vm.filtersWeather(cityName));
      } else {
        await vm.getWeatherData();
        resolve(vm.filtersWeather(cityName));
      }
    })
  }
  private filtersWeather(cityName: string): Array<weatherLocationElementObject> {
    let vm = this;
    if (!vm.data) vm.data = [];
    let data = vm.data.filter(v => {
      return v.locationName === cityName
    }).map((value) => {
      return value.weatherElement
    })[0]
    return data
  }

  private getWeatherData(): Promise<null> {
    let vm = this;
    return new Promise((resolve, reject) => {
      axiosItem.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-9C6EB37A-93A5-4A81-ABC0-CDD0B7CB406C&format=JSON&sort=time').then(res => {
        console.log('獲取天氣資料');
        vm.data = res.data.records.location as Array<weatherLocationObject>;
        vm.cooldown = true;
        setTimeout(() => {
          vm.cooldown = false;
        }, 55 * 60 * 1000);
        clearTimeout(vm.dataTime);
        vm.dataTime = setTimeout(() => {
          vm.data = null;
        }, 60 * 60 * 1000);
        resolve(null);
      }).catch((e) => {
        reject('獲取天氣失敗:' + e)
      })
    })
  }
}

let weather = new Weather;

export default weather.getWeather.bind(weather);