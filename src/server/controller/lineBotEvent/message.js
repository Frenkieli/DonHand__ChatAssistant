/**
 * @description lineBot的訊息事件
 * @author frenkie
 * @date 2020-08-06
 */
import { line, request, config, client, db, fsItem } from './_import';
import { getLineMessageImages } from './_lineEvent';
const fs = require("fs");

let serverIP = config.serverIP;

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
            replyMessage = { type: 'text', text: '請為"' + message + '.jpg"上傳對應的圖片，這張圖片每個人都看的到喔！注意不要上傳私人照片或是為違法照片。'};
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
          console.log(memeResult, 'memeResult')
          if(memeResult){
            replyMessage = {
              type: 'image',
              originalContentUrl: memeResult.fileUrl,
              previewImageUrl: memeResult.fileUrl
            }
          }else{
            replyMessage = { type: 'text', text: '"' + fileStr + '.jpg"不存在喔！為我們新增？'};
          }
          break
        default:
          break;
      }
      break;
    case 'image':
      if(global.lineUserStates[event.source.userId] && global.lineUserStates[event.source.userId].type === 'meme'){
        let imageName = 'meme-' + event.source.userId + '-' + (Math.floor(Math.random() * 99999));
        // 這邊不處理線下的圖片的原因是會消耗效能，因為heroku的設定會定期將非本體的檔案清除所以並不需要另外浪費效能去作這件事
        getLineMessageImages(event.message.id, imageName, 'jpg', './dist/public/images/userMeme').then(res=>{
          request({
            method : 'post',
            url : 'https://api.imgur.com/3/upload',
            headers :{
              Authorization: 'Client-ID ' + config.imgur.clientID
            },
            formData: {
              'type': 'file',
              'image': {
                'value': fs.createReadStream('./dist/public/images/userMeme/' + imageName + '.jpg'),
                'options': {
                  'filename': imageName + '.jpg',
                  'contentType': null
                }
              },
              'name': imageName + '.jpg'
            }
          }, function(error, res){
            if (error) throw new Error(error);
            let imgurData = JSON.parse(res.body).data;
            replyMessage = [
              { 
                type: 'image',
                originalContentUrl: imgurData.link,
                previewImageUrl: imgurData.link 
              },
              { type: 'text', text: '梗圖"' + global.lineUserStates[event.source.userId].memeName + '.jpg"上傳完成'}
            ]
            db.create('memeImages', {
              userId : event.source.userId,
              memeName : global.lineUserStates[event.source.userId].memeName,
              fileUrl : imgurData.link,
              deletehash : imgurData.deletehash
            })
            delete global.lineUserStates[event.source.userId];
            client.replyMessage(event.replyToken, replyMessage).catch(err => {
              console.log('回覆line錯誤:' + err)
            });
          })
        }).catch(err=>{
          console.log('上傳失敗:' + err);
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