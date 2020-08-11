/**
 * @description 建立基本line的建構子
 * @author frenkie
 * @date 2020-08-11
 */
const line = require('@line/bot-sdk');
const request = require('request');
import config from '@@config/config';
const client = new line.Client(config.line);
const fsItem = require("@@controller/fileController");
import db from '@@models/mongoDB';

export default class LineBase implements lineBaseClass {
  public request: any;
  public config: configItem;
  public client: any;
  public fsItem: object;
  public db: mongoDB;
  constructor() {
    this.request = request;
    this.config = config;
    this.client = client;
    this.fsItem = fsItem;
    this.db = db;
  }
  /**
 * @description get line user data
 * @author frenkie
 * @date 2020-08-06
 * @param {*} userId
 * @returns 
 */
  public getLineUserData(userId: string): Promise<lineUserData> {
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
  public getLineMessageImages(messageId: string, name: string, type: string, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      client.getMessageContent(messageId)
        .then(async (stream: any) => {
          let writable = await fsItem.createWriteStream(name, type, path);
          stream.pipe(writable);
          writable.on('finish', () => {
            resolve(name + '.' + type)
          });
          stream.on('error', function (err: any) {
            console.log('串流line圖片失敗:' + err)
            reject(err);
          });
        });
    })
  }
}