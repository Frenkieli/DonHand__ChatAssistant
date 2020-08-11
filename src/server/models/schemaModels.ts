/**
 * @description 建立基本資料庫模型
 * @author frenkie
 * @date 2020-08-06
 */

import mongoose from 'mongoose';
import moment from 'moment';


const lineUserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  statusMessage: { type: String, required: true },
  language: { type: String },
  following: { type: Boolean, required: true },
  time: { type: Number, required: true, default: moment().valueOf() },
}, {
  timestamps: { updatedAt: 'updateTime' }
});
lineUserSchema.index({userId: 1});

const memeImagesSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  memeName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  deletehash: { type: String, required: true },
  time: { type: Number, required: true, default: moment().valueOf() },
}, {
  timestamps: { updatedAt: 'updateTime' }
});
memeImagesSchema.index({memeName: 1});
let schema : any = {
  lineUsers: mongoose.model('lineUsers', lineUserSchema, 'lineUsers'),
  memeImages: mongoose.model('memeImages', memeImagesSchema, 'memeImages')
}
export default schema;