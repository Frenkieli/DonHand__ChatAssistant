/**
 * @description 用來操作伺服器檔案
 * @author frenkie
 * @date 2020-08-06
 */

const fs = require("fs");
const request = require('request');

/**
 * @description create dir
 * @author frenkie
 * @date 2020-08-06
 * @param {*} path
 * @returns 
 */
function checkDirExists(path){
  return new Promise((resolve, reject)=>{
    fs.exists(path, function(exists){
      if(!exists){
        function mkDir (dirPath){
          return new Promise((resolve)=>{
            fs.exists(dirPath, function(exists){
              if(!exists){
                fs.mkdir(dirPath, function(err){
                  if(err) {
                    reject('建立資料夾失敗:' + err);
                  }
                  console.log('建立資料夾:' + dirPath)
                  resolve(true);
                })
              }
            })
          })
        }
        let dir = path.split('/');
        let dirPath = '';
        dir.forEach(async v => {
          dirPath += v +'/';
          await mkDir(dirPath);
        });
        setTimeout(() => {
          resolve(true);
        }, 0);
      }else{
        resolve(true);
      }
    })
  })
}

/**
 * @description download image from url
 * @author frenkie
 * @date 2020-08-06
 * @param {String} url url
 * @param {String} fileName fileName
 * @param {String} type .jpg || .png
 * @param {String} path ./aaa/bbb
 * @returns 
 */
function downloadImage(url, fileName, type, path) {
  return new Promise((resolve, rejects) => {
    request({uri:url, encoding: 'binary'}, function(error, res, body){
      if (error) rejects(error);
      checkDirExists(path).then(res=>{
        fs.writeFile(path + '/' + fileName + '.' + type, body,　"binary", function(err,res){
          if (err) rejects(err);
          resolve(true);
        })
      }).catch(err=>{
        console.log(err);
      });
    })
  })
}

export {
  downloadImage
}