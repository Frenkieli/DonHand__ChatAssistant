/**
 * @description lineBot的訊息事件
 * @author frenkie
 * @date 2020-08-06
 */
import { line, request, config, client, db, fsItem } from './_import';



export default function (event) {
  console.log('訊息事件發生');
  console.log(event);
  const echo = { type: 'text', text: event.message.text };
  client.replyMessage(event.replyToken, echo);
  // use reply API
}