/**
 * @description lineBot的訊息事件
 * @author frenkie
 * @date 2020-08-06
 */
import { line, request, config, client, db, fsItem } from './_import';
import { getLineMessageImages } from './_lineEvent';

export default async function (event) {
  console.log('訊息事件發生');
  console.log(event);
  // use reply API
  let replyMessage = null;
  switch (event.message.type) {
    case 'text':
      let message = event.message.text.split(' ');
      let keyWord = message.splice(0, 1)[0];
      let fileStr = event.message.text.split('.');
      let fileName = fileStr.splice(fileStr.length - 1, 1)[0];
      message = message.join(' ');
      fileStr = fileStr.join(' ');
      // console.log({ message, keyWord, fileName, fileStr })
      switch ((fileName === 'jpg' ? fileName : false) || keyWord) {
        case '.h':
          replyMessage = [
            { type: 'text', text: '目前可用指令如下'},
            { type: 'text', text: '.y2b XXX，回覆youtube的搜尋結果' + '\n\n'  + '.meme XXX，建立XXX.jpg的梗圖' + '\n\n'  + 'XXX.jpg，要求機器人回傳對應的梗圖'}
          ];
          break;
        case '.y2b':
          replyMessage = { type: 'text', text: 'yuotube:' + message };
          break;
        case '.meme':
          let checkMemeResult = await db.findOneQuery('memeImages', {memeName : message});
          if(!checkMemeResult){
            replyMessage = { type: 'text', text: '請為"' + message + '.jpg"上傳對應的圖片，請注意違反法律的圖片會被抓喔！'};
            global.lineUserStates[event.source.userId] = {
              type: 'meme',
              memeName: message
            }
          }else{
            replyMessage = { type: 'text', text: '"' + fileStr + '.jpg"已經存在了喔！'};
          }
          break;
        case 'jpg':
          let memeResult = await db.findOneQuery('memeImages', {memeName : fileStr});
          if(memeResult){
            replyMessage = {
              type: 'image',
              originalContentUrl: 'https://f8f01457a92e.ngrok.io/images/userMeme/' + memeResult.fileName + '.jpg',
              previewImageUrl: 'https://f8f01457a92e.ngrok.io/images/userMeme/' + memeResult.fileName + '.jpg'
            }
          }else{
            replyMessage = { type: 'text', text: '"' + message + '.jpg"不存在喔！為我們新增？'};
          }
          break
        default:
          break;
      }
      break;
    case 'image':
      if(global.lineUserStates[event.source.userId] && global.lineUserStates[event.source.userId].type === 'meme'){
        let imageName = 'meme-' + event.source.userId + '-' + (Math.floor(Math.random() * 99999));
        await getLineMessageImages(event.message.id, imageName, 'jpg', './dist/public/images/userMeme').then(res=>{
          replyMessage = [
            { 
              type: 'image',
              originalContentUrl: 'https://f8f01457a92e.ngrok.io/images/userMeme/' + res,
              previewImageUrl: 'https://f8f01457a92e.ngrok.io/images/userMeme/' + res 
            },
            { type: 'text', text: '梗圖"' + global.lineUserStates[event.source.userId].memeName + '.jpg"上傳完成'}
          ]
          db.create('memeImages', {
            userId : event.source.userId,
            memeName : global.lineUserStates[event.source.userId].memeName,
            fileName : imageName,
          })
          delete global.lineUserStates[event.source.userId];
        }).catch(err=>{
          replyMessage = { type: 'text', text: '梗圖"' + global.lineUserStates[event.source.userId].memeName + '.jpg"上傳失敗'}
          delete global.lineUserStates[event.source.userId];
        })
      }
      break;
    default:
      break;
  }
  if(replyMessage){
    client.replyMessage(event.replyToken, replyMessage).catch(err => {
      console.log('回覆line錯誤:' + err)
    });
  }
}