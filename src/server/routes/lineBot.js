/**
 * @description lineBot的路由
 * @author frenkie
 * @date 2020-08-05
 */
import express from 'express';
const router = express.Router();


const line = require('@line/bot-sdk');
const request = require('request');

const config = require('./lineBotConfig.json');
const client = new line.Client(config);

import db from '@@/server/models/mongoDB';

router.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error('LINE接收錯誤：', err);
      res.status(500).end();
    });
});



function handleEvent(event) {
  console.log(event);
  switch (event.type) {
    case 'unfollow':
      console.log('跟隨發生結束')
      let query = {
        userId : event.source.userId
      }
      db.update('lineUsers', query, {following : false});
      break;
    case 'follow':
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
          userId : data.userId
        }
        db.findOneAndUpdate('lineUsers', query, data);
      });
      break;
    case 'message':
    case 'text':
      // create a echoing text message
      const echo = { type: 'text', text: event.message.text };
      client.replyMessage(event.replyToken, echo);
      // use reply API
      break;
    default:
      break;
  }
  return Promise.resolve(null);
}

export default router;