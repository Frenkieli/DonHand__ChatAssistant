/**
 * @description express相關設定檔
 * @author frenkie
 * @date 2020-08-05
 */

/* express.js */
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';




import createError from'http-errors';

import indexRoutes from '@@routes/index';
import lineBotRoutes from '@@routes/lineBot';



const app = express();

// app.use(express.json()); line的訊息必須在他上面去作解析不然會跳錯
app.use('/lineBot', lineBotRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


/* GET home page. */


/**
 * 
 */
app.use('/', indexRoutes);
// app.use('/connect', connrctServerRoutes);
// app.use('/location', locationRoutes);
// app.use('/playscriptrecords', playscriptrecordsRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err : any, req : any, res : any, next : any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('出錯訊息:' + res.locals.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 使用者狀態存在快取內，不要跟資料庫作以免有過多的溝通
const globalAny:any = global;
globalAny.lineUserStates = {};

export default app;