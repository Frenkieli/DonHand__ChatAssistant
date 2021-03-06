/**
 * @description 將message關於text的指令拉出，因為可以對應的指令可以不斷新增所以另外存放
 * @author frenkie
 * @date 2020-08-12
 */

import LineBase from './_lineBase';
const globalAny: any = global;
// import getAirQuality from '@@interData/getAirQuality';
// import getWeather from '@@interData/getWeather';
import getAirData from '@@interData/getAirData';
import lineTempMaker from '@@controller/lineBotEvent/lineTempMaker/lineTempMaker';
import axiosItem from '@@interModules/axios';


export default class LineMessageCommand extends LineBase {
  /**
   * @description command .h event
   * @author frenkie
   * @date 2020-08-12
   * @param {string} message
   * @returns {Promise<replyMessage>}
   * @memberof LineMessageCommand
   */
  public onTextMessageHelp (message: string): Promise<replyMessage>{
    const vm = this;
    let replyMessage: replyMessage = null;
    return new Promise((resolve, rejects) => {
      replyMessage = [
        { type: 'text', text: '目前可用指令如下' },
        { type: 'text', text: 
        '.doro，抽一張撲克牌' + '\n\n' 
        + '.y2 XXX，回覆youtube的搜尋結果' + '\n\n' 
        + '.air XXX，取得對應縣市的空汙資料' + '\n\n' 
        + '.meme XXX，建立XXX.jpg的梗圖' + '\n\n' 
        + '.delme XXX，刪除XXX.jpg的梗圖' + '\n\n' 
        + 'XXX.jpg，要求機器人回傳對應的梗圖'}
      ];
      resolve(replyMessage);
    })
  }
  
  public onTextMessageDrawCard (message: string): Promise<replyMessage>{
    const vm = this;
    let replyMessage: replyMessage = null;
    return new Promise((resolve, rejects) => {
      let suit = ['spade', 'heart', 'diamond', 'club'];
      let suitType = suit[Math.floor(Math.random() * 4)];
      let cardNumber = Math.floor(Math.random() * 13 ) + 1;
      replyMessage = [{
        type: 'image',
        originalContentUrl:  vm.config.serverIP + 'images/poker/' + suitType + cardNumber + '.jpg',
        previewImageUrl:  vm.config.serverIP + 'images/poker/' + suitType + cardNumber + '.jpg'
      }];
      resolve(replyMessage);
    })
  }

  /**
   * @description command .y2 event
   * @author frenkie
   * @date 2020-08-12
   * @param {string} message
   * @returns {Promise<replyMessage>}
   * @memberof LineMessageCommand
   */
  public onTextMessageYoutube (message: string): Promise<replyMessage>{
    const vm = this;
    let replyMessage: replyMessage = null;
    return new Promise((resolve, rejects) => {
      var request = require('request');
      // let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=' + encodeURI(message) + '&type=video&videoCategoryId=10&key=' + this.config.googleApiKey;
      let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=' + encodeURI(message) + '&type=video&key=' + this.config.googleApiKey;
      console.log(url)
      var options = {
        'method': 'GET',
        'url': url,
        'headers': {
        }
      };
      request(options, function (error: any, response: any) {
        if (error) throw new Error(error);
        let youtubeItems = JSON.parse(response.body).items;
        console.log(response.body, '獲取youtube結果');
        console.log(youtubeItems, 'youtubeItems');
        let flexContents: any = [];
        youtubeItems.forEach((v: any) => {
          flexContents.push({
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": v.snippet.thumbnails.medium.url,
              "size": "full",
              "aspectMode": "cover",
              "aspectRatio": "480:260"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": v.snippet.title,
                  "weight": "bold",
                  "size": "md",
                  "style": "italic"
                },
                {
                  "type": "text",
                  "text": v.snippet.channelTitle,
                  "size": "xxs",
                  "align": "end"
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [{
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "點播",
                        "text": "https://www.youtube.com/watch?v=" + v.id.videoId
                      },
                      "style": "primary",
                      "height": "sm"
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "uri",
                        "label": "前往",
                        "uri": "https://www.youtube.com/watch?v=" + v.id.videoId
                      },
                      "style": "primary",
                      "height": "sm"
                    }
                  ],
                  "spacing": "xxl"
                }
              ]
            }
          })
        })
        replyMessage = {
          type: "flex",
          altText: message + "的搜尋結果(youtube)",
          contents: {
            type: "carousel",
            contents: flexContents
          }
        }
        console.log('replyMessage', replyMessage)
        resolve(replyMessage);
      });
    })
  }
  /**
   * @description command .meme event
   * @author frenkie
   * @date 2020-08-12
   * @param {string} message
   * @param {lineEvent} event
   * @returns {Promise<replyMessage>}
   * @memberof LineMessageCommand
   */
  public onTextMessageMeme (message: string, event: lineEvent): Promise<replyMessage>{
    const vm = this;
    let replyMessage: replyMessage = null;
    return new Promise(async (resolve, rejects) => {
      let checkMemeResult = globalAny.memeImages[message];
      if (!checkMemeResult) {
        replyMessage = { type: 'text', text: '請為"' + message + '.jpg"上傳對應的圖片，這張圖片每個人都看的到！注意不要上傳私人照片或是為違法照片。' };
        globalAny.lineUserStates[event.source.userId] = {
          type: 'meme',
          memeName: message
        }
        resolve(replyMessage);
      } else {
        replyMessage = { type: 'text', text: '"' + message + '.jpg"已經存在了喔！' };
        resolve(replyMessage);
      }
    })
  }
  /**
   * @description command .delmeme event
   * @author frenkie
   * @date 2020-08-28
   * @param {string} message
   * @param {lineEvent} event
   * @returns {Promise<replyMessage>}
   * @memberof LineMessageCommand
   */
  public onTextMessageDelme (message: string, event: lineEvent): Promise<replyMessage>{
    const vm = this;
    let replyMessage: replyMessage = null;
    return new Promise(async (resolve, rejects) => {
      let checkMemeResult = globalAny.memeImages[message];
      if (checkMemeResult) {
        console.log(checkMemeResult.deletehash, 'checkMemeResult')
        axiosItem.delete('https://api.imgur.com/3/image/' + checkMemeResult.deletehash, null, {
          Authorization: 'Client-ID ' + vm.config.imgur.clientID
        }).then(()=>{
          delete globalAny.memeImages[message];
          replyMessage = [
            { type: 'text', text: message + '.jpg"已經刪除囉！注意該圖片如果已經被讀取，會暫時保留在line的暫存檔中，如不放心可以到此網址確認該圖片已經被刪除。' },
            { type: 'text', text: checkMemeResult.fileUrl }
          ];
          resolve(replyMessage);
        })
      } else {
        replyMessage = { type: 'text', text: '"' + message + '.jpg"找不到呢！' };
        resolve(replyMessage);
      }
    })
  }
  /**
   * @description command .jpg event
   * @author frenkie
   * @date 2020-08-12
   * @param {string} message
   * @returns {Promise<replyMessage>}
   * @memberof LineMessageCommand
   */
  public onTextMessageMemeJpg (message: string): Promise<replyMessage>{
    const vm = this;
    let replyMessage: replyMessage = null;
    return new Promise(async (resolve, rejects) => {
      let memeResult = globalAny.memeImages[message];
      console.log(memeResult, 'memeResult')
      if (memeResult) {
        replyMessage = {
          type: 'image',
          originalContentUrl: memeResult.fileUrl,
          previewImageUrl: memeResult.fileUrl
        }
        globalAny.memeImages[message].counter += 1;
        resolve(replyMessage);
      } else {
        replyMessage = { type: 'text', text: '"' + message + '.jpg"不存在喔！為我們新增？' };
        resolve(replyMessage);
      }
    })
  }
  
  public onTextMessageAirQuality (message: string): Promise<replyMessage>{
    const vm = this;
    let replyMessage: replyMessage = null;
    return new Promise(async (resolve, rejects) => {
      message = message.replace('台', '臺');
      let string : any = {
        '宜蘭縣' : '宜蘭縣',
        '宜蘭' : '宜蘭縣',
        '花蓮縣' : '花蓮縣',
        '花蓮' : '花蓮縣',
        '金門縣' : '金門縣',
        '金門' : '金門縣',
        '南投縣' : '南投縣',
        '南投' : '南投縣',
        '屏東縣' : '屏東縣',
        '屏東' : '屏東縣',
        '苗栗國' : '苗栗縣',
        '苗栗' : '苗栗縣',
        '苗栗縣' : '苗栗縣',
        '桃園市' : '桃園市',
        '桃園' : '桃園市',
        '高雄市' : '高雄市',
        '高雄' : '高雄市',
        '基隆市' : '基隆市',
        '基隆' : '基隆市',
        '連江縣' : '連江縣',
        '連江' : '連江縣',
        '雲林縣' : '雲林縣',
        '雲林' : '雲林縣',
        '新北市' : '新北市',
        '新北' : '新北市',
        '新竹市' : '新竹市',
        '新竹' : '新竹市',
        '新竹縣' : '新竹縣',
        '嘉義市' : '嘉義市',
        '嘉義' : '嘉義市',
        '嘉義縣' : '嘉義縣',
        '彰化縣' : '彰化縣',
        '彰化' : '彰化縣',
        '臺中市' : '臺中市',
        '臺中' : '臺中市',
        '臺北市' : '臺北市',
        '臺北' : '臺北市',
        '天龍國' : '臺北市',
        '臺東縣' : '臺東縣',
        '臺東' : '臺東縣',
        '臺南市' : '臺南市',
        '臺南' : '臺南市',
        '澎湖縣' : '澎湖縣',
        '澎湖' : '澎湖縣'
      };
      if(string[message]){
        getAirData(string[message]).then(result=>{
          console.log(result[0],result[1]);
          if(result[0] && result[1]){
            replyMessage = lineTempMaker.airMaker(result[0] as Array<weatherLocationElementObject>, result[1] as Array<airLocationObject>, message, )
            if(message === '苗栗國' && Array.isArray(replyMessage)){
              if(Math.floor(Math.random() * 2) === 0){
                replyMessage.push({
                  type: 'text', text: '與該國建立之衛星連線即將斷開...'
                })
              }else{
                replyMessage = { type: 'text', text: '連線遭到該國反動份子攔截，與該國建立之衛星連線已斷開...' };
              }
            }
          }else{
            if(message === '苗栗國'){
              replyMessage = { type: 'text', text: '正在與該國建立衛星連線...'};
            }else{
              replyMessage = { type: 'text', text: '天氣與空氣品質資料更新中，請稍後在試。'};
            }
          }
          resolve(replyMessage)
        })
      }else{
        let str : string = '';
        for(let key in string){
          str += key + ',';
        }
        str = str.slice(0, str.length-1);
        replyMessage = [{ type: 'text', text: '那個地方...好像沒有空氣監測站ㄟ，目前只有下列的縣市有監測站喔，抱歉'},
                        { type: 'text', text: str}];
        resolve(replyMessage);
      }
    })
  }
}