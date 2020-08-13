/**
 * @description lineBot的訊息事件
 * @author frenkie
 * @date 2020-08-06
 */
import messageCommandBase from './_messageCommandBase';
const fs = require("fs");

const globalAny: any = global;

class LineMessage extends messageCommandBase {
  /**
   * @description line message receive event
   * @author frenkie
   * @date 2020-08-11
   * @param {lineEvent} event
   * @memberof LineMessage
  */
  public async onReceiveMessage(event: lineEvent) {
    console.log('訊息事件發生');
    console.log(event);
    const vm = this;
    const lineHandleEvent: lineMessageEventType = {
      text: vm.onTextMessage.bind(vm),
      image: vm.onImageMessage.bind(vm),
    }
    if (lineHandleEvent[event.message.type]) {
      let replyMessage: replyMessage = await lineHandleEvent[event.message.type](event);
      vm.replyMessageEvent.bind(vm)(event.replyToken, replyMessage)
    }
  }
  /**
   * @description handle line event text type
   * @author frenkie
   * @date 2020-08-12
   * @private
   * @param {lineEvent} event
   * @returns {Promise<replyMessage>}
   * @memberof LineMessage
   */
  private onTextMessage(event: lineEvent): Promise<replyMessage> {
    const vm = this;
    let replyMessage: replyMessage = null;
    let message: string = event.message.text;
    let keyWord: lineMessageCommandEventName;
    if (message.slice(message.length - 4, message.length) === '.jpg') {
      keyWord = message.slice(message.length - 4, message.length).replace('.', '') as lineMessageCommandEventName;
      message = message.slice(0, message.length - 4).trim();
    } else if(message.slice(0, 1) === '.' && message.slice(0, 4) !== '.jpg') {
      let messageSplit = message.split(' ');
      keyWord = messageSplit.splice(0, 1)[0].replace('.', '') as lineMessageCommandEventName;
      message = messageSplit.join(' ').trim();
    }
    const regex = new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9_ ]*$");
    return new Promise(async (resolve, rejects) => {
      const commandHandleEvent: lineMessageCommandEventType = {
        h: vm.onTextMessageHelp.bind(vm),
        y2b: vm.onTextMessageYoutube.bind(vm),
        meme: vm.onTextMessageMeme.bind(vm),
        jpg: vm.onTextMessageMemeJpg.bind(vm),
        air: vm.onTextMessageAirQuality.bind(vm),
      }
      if(commandHandleEvent[keyWord]){
        if ((message.length === 0 || !regex.test(message)) && keyWord !== 'h') {
          replyMessage = { type: 'text', text: '不好意思，我只看得懂中英文ㄟ，抱歉。' }
          resolve(replyMessage);
        }else{
          let result : replyMessage = await commandHandleEvent[keyWord](message, event);
          resolve(result);
        }
      }
    })
  }

  /**
   * @description handle line event image type
   * @author frenkie
   * @date 2020-08-12
   * @private
   * @param {lineEvent} event
   * @returns {Promise<replyMessage>}
   * @memberof LineMessage
   */
  private onImageMessage(event: lineEvent): Promise<replyMessage> {
    return new Promise((resolve, reject) => {
      const vm = this;
      let replyMessage: replyMessage = null;
      if (globalAny.lineUserStates[event.source.userId] && globalAny.lineUserStates[event.source.userId].type === 'meme') {
        let lineUserStates = globalAny.lineUserStates[event.source.userId];
        delete globalAny.lineUserStates[event.source.userId];
        let imageName = 'meme-' + event.source.userId + '-' + (Math.floor(Math.random() * 99999));
        // 這邊不處理線下的圖片的原因是會消耗效能，因為heroku的設定會定期將非本體的檔案清除所以並不需要另外浪費效能去作這件事
        vm.getLineMessageImages(event.message.id, imageName, 'jpg', './').then(res => {
          vm.request({
            method: 'post',
            url: 'https://api.imgur.com/3/upload',
            headers: {
              Authorization: 'Client-ID ' + vm.config.imgur.clientID
            },
            formData: {
              'type': 'file',
              'image': {
                'value': fs.createReadStream('./' + imageName + '.jpg'),
                'options': {
                  'filename': imageName + '.jpg',
                  'contentType': null
                }
              },
              'name': imageName + '.jpg'
            }
          }, function (error: any, res: any) {
            if (error) throw new Error(error);
            let imgurData = JSON.parse(res.body).data;
            replyMessage = [
              {
                type: 'image',
                originalContentUrl: imgurData.link,
                previewImageUrl: imgurData.link
              },
              { type: 'text', text: '梗圖"' + lineUserStates.memeName + '.jpg"上傳完成' }
            ]
            vm.db.create('memeImages', {
              userId: event.source.userId,
              memeName: lineUserStates.memeName,
              fileUrl: imgurData.link,
              deletehash: imgurData.deletehash
            })
            resolve(replyMessage);
          })
        }).catch(err => {
          console.log('上傳失敗:' + err);
          replyMessage = { type: 'text', text: '梗圖"' + globalAny.lineUserStates[event.source.userId].memeName + '.jpg"上傳失敗' };
          delete globalAny.lineUserStates[event.source.userId];
          resolve(replyMessage);
        })
      }
    })
  }
}

let lineMessageItem = new LineMessage;

export default lineMessageItem.onReceiveMessage.bind(lineMessageItem);