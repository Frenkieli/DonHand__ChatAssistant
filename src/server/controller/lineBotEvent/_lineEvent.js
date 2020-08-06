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
function getLineUserData(userId) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'GET',
      'url': 'https://api.line.me/v2/bot/profile/' + userId,
      'headers': {
        'Authorization': 'Bearer ' + config.channelAccessToken,
        'Content-Type': 'application/json',
      },
    };
    request(options, function (error, response) {
      if (error){
        reject(error)
      };
      let data = JSON.parse(response.body);
      resolve(data);
    });
  })
}

export {
  getLineUserData
}