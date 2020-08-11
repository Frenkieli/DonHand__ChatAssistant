/**
 * @description lineBot的跟隨事件
 * @author frenkie
 * @date 2020-08-06
 */
import LineBase from './lineBase';

class LineFollow extends LineBase {
  /**
   * @description line start follow event
   * @author frenkie
   * @date 2020-08-11
   * @param {lineEvent} event
   * @returns 
  */
  public startFollow(event : lineEvent) {
    console.log('被跟隨發生');
    console.log(event);
    this.getLineUserData(event.source.userId).then((data: lineUserData)=>{
      data.following = true;
      console.log(data, '獲取用戶資料');
      let query = {
        userId: data.userId
      }
      this.client.replyMessage(event.replyToken, {
        type: 'text',
        text: data.displayName + '！！！感謝您的跟隨～！'
      });
      this.db.findOneAndUpdate('lineUsers', query, data);
    }).catch((err : any)=>{
      console.log('獲取個人資料失敗:' + err)
    })
  }
}

let lineFollowItem = new LineFollow;

export default lineFollowItem.startFollow.bind(lineFollowItem);