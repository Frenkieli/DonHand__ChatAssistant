/**
 * @description 建立axios相關模組用做共用
 * @author frenkie
 * @date 2020-08-26
 */
import axios, { AxiosInstance, Method } from 'axios';

class AxiosItem {
  static axios: AxiosInstance = axios.create();
  static axiosInit() {
    this.axios.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        //请求错误时做些事
        console.log('Axios請求發生錯誤:');
        console.log(error);
        return Promise.reject(error);
      }
    )
    this.axios.interceptors.response.use(
      function (config) {
        return config;
      },
      function (error) {
        console.log('Axios接收發生錯誤');
        console.log(error);
        return Promise.reject(error);
      }
    )
  }
  private static axiosMain(url: string, method: Method, data : object | null = null, header : object = {}){
    return this.axios.request({
      url: url,
      method: method,
      headers: header,
      data: data
    });
  }
  static get(url: string, data : object | null = null, header : object = {}) {
    return this.axiosMain(url, 'get', data, header)
  }
  static delete(url: string, data : object | null = null, header : object = {}) {
    return this.axiosMain(url, 'delete', data, header)
  }
}

AxiosItem.axiosInit();

export default AxiosItem;