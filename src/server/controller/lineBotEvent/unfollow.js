/**
 * @description lineBot的解除跟隨事件
 * @author frenkie
 * @date 2020-08-06
 */
import { db } from './_import';



export default function (event) {
  console.log('取消跟隨發生');
  console.log(event);
  let query = {
    userId: event.source.userId
  }
  db.update('lineUsers', query, { following: false });
}