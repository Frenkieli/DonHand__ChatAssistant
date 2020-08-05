/**
 * @description lineBot的路由
 * @author frenkie
 * @date 2020-08-05
 */
import express from 'express';
const router = express.Router();
const line = require('@line/bot-sdk');

const config = require('./lineBotConfig.json');
const client = new line.Client(config);

router.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error('LINE接收錯誤：', err);
      res.status(500).end();
    });
});



function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };
  client.replyMessage(event.replyToken, echo);
  // use reply API
  return true;
}

export default router;