/**
 * @description 用來獲取天氣和空氣品質的功能
 * @author frenkie
 * @date 2020-08-26
 */

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
}