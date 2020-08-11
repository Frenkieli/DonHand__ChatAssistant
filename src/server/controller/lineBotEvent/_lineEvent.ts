/**
 * @description 操控line相關的事件
 * @author frenkie
 * @date 2020-08-06
 */
import { line, request, config, client, db, fsItem } from './_import';

/**
 * @description get line user data
 * @author frenkie
 * @date 2020-08-06
 * @param {*} userId
 * @returns 
 */
let getLineUserData = function(userId: string) : Promise<lineUserData> {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'GET',
      'url': 'https://api.line.me/v2/bot/profile/' + userId,
      'headers': {
        'Authorization': 'Bearer ' + config.line.channelAccessToken,
        'Content-Type': 'application/json',
      },
    };
    request(options, function (error: any, response: any) {
      if (error) {
        reject(error)
      };
      let data = JSON.parse(response.body);
      resolve(data);
    });
  })
}


/**
 * @description get line images
 * @author frenkie
 * @date 2020-08-07
 * @param {String} messageId
 * @param {String} name
 * @param {String} type .jpg
 * @param {String} path ./ src/xxx
 * @returns 
 */
let getLineMessageImages = function (messageId: string, name: string, type: string, path: string) : Promise<string> {
  return new Promise((resolve, reject) => {
    client.getMessageContent(messageId)
    .then(async (stream: any) => {
      let writable = await fsItem.createWriteStream(name, type, path);
      stream.pipe(writable);
      writable.on('finish', () => {
        resolve(name + '.' + type)
      });
      stream.on('error', function(err: any){
        console.log('串流line圖片失敗:' + err)
        reject(err);
      });
    });
  })
}

export {
  getLineUserData,
  getLineMessageImages
}