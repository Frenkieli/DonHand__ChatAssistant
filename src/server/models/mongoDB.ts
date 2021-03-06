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
 * @description find data with query
 * @author frenkie
 * @date 2020-09-02
 * @param {String} CollectionName
 * @param {Object} query
 * @returns 
 */
function findQuery(CollectionName: CollectionName, query: object = {}){
  return new Promise(function (resolve, reject) {
    const dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.find(query, function (err: any, docs: any) {
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
 * @description find one data with query
 * @author frenkie
 * @date 2020-08-07
 * @param {String} CollectionName
 * @param {Object} query
 * @returns 
 */

function findOneQuery(CollectionName: CollectionName, query: object){
  return new Promise(function (resolve, reject) {
    const dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.findOne(query, function (err: any, docs: any) {
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
function create(CollectionName: CollectionName, insertObject: object) {
  return new Promise(function (resolve, reject) {
    const dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.create(insertObject, function (err: any, docs: any) {
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
 * @param {Object} findObject query condition
 * @param {Object} insertObject create object
 * @param {Object} [opts={
 *     new: true, return create data
 *     upsert: true, if not exist add
 *     returnNewDocument: true, return update data
 *   }] findOneAndUpdate options
 * @returns 
 */
function findOneAndUpdate(
  CollectionName : CollectionName,
  findObject : object,
  insertObject : object,
  opts = {
    new: true,
    upsert: true,
    returnNewDocument: true,
  }) {
  return new Promise(function (resolve, reject) {
    const dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.findOneAndUpdate(findObject, insertObject, {
        new: opts.new,              //false: 不回傳更新資料,    true: 回傳更新資料.
        upsert: opts.upsert,                     //false: 找不到此筆,不新增, true: 找不到此筆,就新增.
        useFindAndModify: false
      },
        function (err : any, docs : any) {
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
 * @param {CollectionName} CollectionName tabel name
 * @param {Object} findObject query condition
 * @param {Object} insertObject create object
 * @returns 
 */
function update(CollectionName : CollectionName, findObject : object, updateObject : object) {
  return new Promise(function (resolve, reject) {
    const dbModel = schemaModels[CollectionName];
    if (dbModel) {
      dbModel.updateOne(findObject, updateObject, function (err : any, docs : any) {
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

/**
 * @description delete de data
 * @author frenkie
 * @date 2020-08-28
 * @param {CollectionName} CollectionName tabel name
 * @param {object} findObject query condition
 * @returns 
 */
function remove(CollectionName: CollectionName, findObject: object) {
  return new Promise(function (resolve, reject) {
    const dbModel = schemaModels[CollectionName];
      if (dbModel) {
        if (typeof findObject === 'string') {
          dbModel.findByIdAndRemove(findObject, function (err: any, docs: any) {
            if(err) {console.log('remove: ', err);}
            resolve(checkDocs(err, docs));
          })
        } else {
          dbModel.remove(findObject, function (err: any, docs: any) {
            if(err) {console.log('remove2: ', err);}
            resolve(checkDocs(err, docs));
          })
        }
      } else resolve(false);
  })
}

let mongoDBItem : mongoDB = {
  findQuery,
  findOneQuery,
  create,
  findOneAndUpdate,
  update,
  remove
};

export default mongoDBItem;


/**
 * @description to cheack database result and standardization
 * @author frenkie
 * @date 2020-08-06
 * @param {*} err from mongode param
 * @param {*} docs from mongode param
 * @returns 
 */
function checkDocs(err : any, docs : any) {
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
mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });