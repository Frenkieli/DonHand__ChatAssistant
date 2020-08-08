/**
 * @description 存放環境等相關參數
 * @author frenkie
 * @date 2020-08-05
 */

/* config.js */
let env = process.env.NODE_Server;
console.log('=======================================================');
console.log(`   current environment: linebot_crawler / ${JSON.stringify(env)}`);
console.log('=======================================================');

let config = {
  version: '1.0.0',
  env: env,
  port: '3000',
  db: {
    host: '127.0.0.1',
    port: 27017,
    db: 'lineBot'
  },
  line: {
    channelAccessToken: process.env.donkey_lineChannelAccessToken,
    channelSecret: process.env.donkey_lineChannelSecret
  },
  // 現在測試和線上部屬有固定IP的設定
  serverIP: process.env.serverIP ? process.env.serverIP : 'https://db0382e30b05.ngrok.io/',
};
config.mongoDB = process.env.mongoDB ? process.env.mongoDB : `mongodb://${config.db.host}:${config.db.port}/${config.db.db}`;

export default config;