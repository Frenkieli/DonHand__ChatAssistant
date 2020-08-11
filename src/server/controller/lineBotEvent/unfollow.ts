/**
 * @description lineBot的解除跟隨事件
 * @author frenkie
 * @date 2020-08-06
 */
import LineBase from './lineBase';

class LineUnfollow extends LineBase {
  /**
   * @description line unfollow event
   * @author frenkie
   * @date 2020-08-11
   * @param {lineEvent} event
   * @returns 
  */
  public unfollow (event: lineEvent) {
    console.log('取消跟隨發生');
    console.log(event);
    let query = {
      userId: event.source.userId
    }
    this.db.update('lineUsers', query, { following: false });
  }
}

let lineUnfollowItem = new LineUnfollow;

export default lineUnfollowItem.unfollow.bind(lineUnfollowItem);