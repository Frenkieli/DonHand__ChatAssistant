/**
 * @description lineBot的跟隨事件
 * @author frenkie
 * @date 2020-08-06
 */
import { request, config, client, db, fsItem } from './_import';
import { getLineUserData } from './_lineEvent';


export default function (event : any) {
  console.log('被跟隨發生');
  console.log(event);
  getLineUserData(event.source.userId).then((data: any)=>{
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
  }).catch((err : any)=>{
    console.log('獲取個人資料失敗:' + err)
  })
}