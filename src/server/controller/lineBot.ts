/**
 * @description lineBot的處理事件
 * @author frenkie
 * @date 2020-08-06
 */

import follow from '@@controller/lineBotEvent/follow';
import message from '@@controller/lineBotEvent/message';
import unfollow from '@@controller/lineBotEvent/unfollow';

let lineEvent : lineEventType = {
  follow,
  message,
  unfollow,
}

/**
 * @description lineEntry
 * @author frenkie
 * @date 2020-08-06
 * @param {*} req from routes param
 * @param {*} res from routes param
 */
function lineEntry(req : any, res : any) {
  Promise
    .all(req.body.events.map((event:lineEvent)=>{
      if(lineEvent[event.type]) {
        lineEvent[event.type](event)
      }else{
        console.log('line事件: ' + event.type + ' ,尚未建立')
      }
      return Promise.resolve(null);
    }))
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error('LINE接收錯誤：', err);
      res.status(500).end();
    });
};

export default {
  lineEntry
}