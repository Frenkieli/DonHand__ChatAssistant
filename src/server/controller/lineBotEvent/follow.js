/**
 * @description lineBot的跟隨事件
 * @author frenkie
 * @date 2020-08-06
 */
import { line, request, config, client, db } from './_import';


export default function (event) {
  console.log('被跟隨發生');
  console.log(event);
  var options = {
    'method': 'GET',
    'url': 'https://api.line.me/v2/bot/profile/' + event.source.userId,
    'headers': {
      'Authorization': 'Bearer ' + config.channelAccessToken,
      'Content-Type': 'application/json',
    },
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let data = JSON.parse(response.body);
    data.following = true;
    console.log(data, '獲取用戶資料');
    let query = {
      userId: data.userId
    }
    client.replyMessage(event.replyToken, {
      type: 'text',
      text: data.displayName + '！！！感謝您的跟隨～！'
    });
    db.findOneAndUpdate('lineUsers', query, data);
  });
}