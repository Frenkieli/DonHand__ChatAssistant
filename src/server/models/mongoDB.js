/**
 * @description 建立操控資料庫的基本函式
 * @author frenkie
 * @date 2020-08-06
 */

import schemaModels from '@@models/schemaModels';
import moment from 'moment';
import mongoose from 'mongoose';
import config from '@@config/config';

/**
 * @description find one data with query
 * @author frenkie
 * @date 2020-08-07
 * @param {String} CollectionName
 * @param {Object} query
 * @returns 
 */
function findOneQuery(CollectionName, query){
  return new Promise(function (resolve, reject) {
    var dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.findOne(query, function (err, docs) {
        resolve(checkDocs(err, docs));
      });
    } else {
      reject(null)
    };
  }).catch(err => {
    console.error(err);
  })
}


/**
 * @description create new data
 * @author frenkie
 * @date 2020-08-06
 * @param {String} CollectionName tabel name
 * @param {Object} insertObject create object
 * @returns 
 */
function create(CollectionName, insertObject) {
  return new Promise(function (resolve, reject) {
    var dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.create(insertObject, function (err, docs) {
        resolve(checkDocs(err, docs));
      });
    } else {
      reject(null)
    };
  }).catch(err => {
    console.error(err);
  })
}

/**
 * @description find data if exist update, else create
 * @author frenkie
 * @date 2020-08-06
 * @param {String} CollectionName tabel name
 * @param {String} findObject query condition
 * @param {Object} insertObject create object
 * @param {Object} [opts={
 *     new: true, return create data
 *     upsert: true, if not exist add
 *     returnNewDocument: true, return update data
 *   }] findOneAndUpdate options
 * @returns 
 */
function findOneAndUpdate(
  CollectionName,
  findObject,
  insertObject,
  opts = {
    new: true,
    upsert: true,
    returnNewDocument: true,
  }) {
  return new Promise(function (resolve, reject) {
    var dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.findOneAndUpdate(findObject, insertObject, {
        new: opts.new,              //false: 不回傳更新資料,    true: 回傳更新資料.
        upsert: opts.upsert,                     //false: 找不到此筆,不新增, true: 找不到此筆,就新增.
        returnNewDocument: opts.returnNewDocument,//false: 不回傳更新資料,    true: 回傳更新資料.
        useFindAndModify: false
      },
        function (err, docs) {
          if (err) {
            console.log('findOneAndUpdateNew: ', err);
          }
          resolve(checkDocs(err, docs));
        })
    } else {
      resolve(null)
    };
  })
}

/**
 * @description update data
 * @author frenkie
 * @date 2020-08-06
 * @param {String} CollectionName tabel name
 * @param {String} findObject query condition
 * @param {Object} insertObject create object
 * @returns 
 */
function update(CollectionName, findObject, updateObject) {
  return new Promise(function (resolve, reject) {
    var dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.updateOne(findObject, updateObject, function (err, docs) {
        if (err) {
          console.log('update error: ', CollectionName, findObject, updateObject);
        }
        resolve(checkDocs(err, docs));
      })
    } else {
      resolve(false)
    };
  })
}



export default {
  findOneQuery,
  create,
  findOneAndUpdate,
  update
};


/**
 * @description to cheack database result and standardization
 * @author frenkie
 * @date 2020-08-06
 * @param {*} err
 * @param {*} docs
 * @returns 
 */
function checkDocs(err, docs) {
  if (err) {
    console.log('DB err:', err.toString());
    console.error(err);
    if (err.message.indexOf('E11000 duplicate') > -1)
      return 'duplicate';
    else
      return false;

  } else if (docs === null || docs === undefined) {
    return false;
  } else if (docs.nModified > 1 && docs.ok > 1) {
    return true;
  } else if (Object.keys(docs).length > 0 || docs.length > 0 || Number.isInteger(docs)) {
    return docs;
  } else {
    return false;
  }
}

console.log(config.db);
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.db}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });