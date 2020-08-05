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
  port: '3000'
};

export default config;