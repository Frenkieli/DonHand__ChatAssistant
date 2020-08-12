/**
 * @description 將message關於text的指令拉出，因為可以對應的指令可以不斷新增所以另外存放
 * @author frenkie
 * @date 2020-08-12
 */

import LineBase from './_lineBase';
const globalAny: any = global;
import getAirQuality from '@@interface/getAirQuality';

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
        { type: 'text', text: '.y2b XXX，回覆youtube的搜尋結果' + '\n\n' + '.meme XXX，建立XXX.jpg的梗圖' + '\n\n' + 'XXX.jpg，要求機器人回傳對應的梗圖' }
      ];
      resolve(replyMessage);
    })
  }

  /**
   * @description command .y2b event
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
      let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=' + encodeURI(message) + '&type=video&videoCategoryId=10&key=' + this.config.googleApiKey;
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
              "contents": [
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
      let checkMemeResult = await vm.db.findOneQuery('memeImages', { memeName: message });
      if (!checkMemeResult) {
        replyMessage = { type: 'text', text: '請為"' + message + '.jpg"上傳對應的圖片，這張圖片每個人都看的到喔！注意不要上傳私人照片或是為違法照片。' };
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
      let memeResult = await vm.db.findOneQuery('memeImages', { memeName: message }) as any;
      console.log(memeResult, 'memeResult')
      if (memeResult) {
        replyMessage = {
          type: 'image',
          originalContentUrl: memeResult.fileUrl,
          previewImageUrl: memeResult.fileUrl
        }
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
      getAirQuality('新北市').then(res=>{
        console.log('拿到了', res);
        resolve({ type: 'text', text: '空氣拿到囉'})
      })
    })
  }
}