/**
 * @description 建立基本資料庫模型
 * @author frenkie
 * @date 2020-08-06
 */

import mongoose from 'mongoose';
import moment from 'moment';


const lineUserSchema = mongoose.Schema({
  userId                : { type: String, required: true ,unique :true},
  displayName           : { type: String, required: true },
  pictureUrl            : { type: String, required: true },
  statusMessage         : { type: String, required: true },    // 用戶狀態
  language              : { type: String},                     // 用戶是什麼語言
  following             : { type: Boolean,required: true},     // 跟隨狀態
  time                  : { type: Number, required: true, default:moment().valueOf()},
},{
  timestamps: { updatedAt: 'updateTime' }
});
lineUserSchema.index({userId: 1});

const memeImagesSchema = mongoose.Schema({
  userId                : { type: String, required: true },
  memeName              : { type: String, required: true },
  fileName              : { type: String, required: true },
  time                  : { type: Number, required: true, default:moment().valueOf()},
},{
  timestamps: { updatedAt: 'updateTime' }
});
memeImagesSchema.index({memeName: 1});

export default {
  lineUsers: mongoose.model('lineUsers', lineUserSchema, 'lineUsers'),
  memeImages: mongoose.model('memeImages', memeImagesSchema, 'memeImages')
};