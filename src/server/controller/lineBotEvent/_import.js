/**
 * @description lineBot的事件統一的變數
 * @author frenkie
 * @date 2020-08-06
 */

const line = require('@line/bot-sdk');
const request = require('request');
const config = require('./_lineBotConfig.json');
const client = new line.Client(config);
import db from '@@models/mongoDB';

export {
  line,
  request,
  config,
  client,
  db
}