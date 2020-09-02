/**
 * @description 系統排程用
 * @author frenkie
 * @date 2020-09-02
 */
const globalAny: any = global;
import db from '@@models/mongoDB';

/**
 * @description schedule Start
 * @author frenkie
 * @date 2020-09-02
 */
async function scheduleStart() {
  let memeImagesList = await db.findQuery('memeImages')
  if (memeImagesList) memeImagesList.forEach((v: any) => {
    globalAny.memeImages[v.memeName] = v;
  })
  lastData = JSON.parse(JSON.stringify(globalAny.memeImages));
  setInterval(() => {
    syncMemeImages();
  }, 10 * 1000)
}
let lastData: any = {};
/**
 * @description sync memeImages db
 * @author frenkie
 * @date 2020-09-02
 */
function syncMemeImages() {
  let syncData = JSON.parse(JSON.stringify(globalAny.memeImages));
  for (let key in syncData) {
    if (!lastData[key]) {
    } else if (syncData[key].counter !== lastData[key].counter) {
      db.findOneAndUpdate('memeImages', { _id: syncData[key]._id }, syncData[key]);
      delete lastData[key];
    }
  }
  for (let key in lastData) {
    if (!syncData[key]) db.remove('memeImages', { _id: lastData[key]._id });
  }
  lastData = syncData;
}

export default scheduleStart;