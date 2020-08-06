/**
 * @description lineBot的路由
 * @author frenkie
 * @date 2020-08-05
 */
import express from 'express';
const router = express.Router();
import controller from '@@controller/lineBot'

const middleware = require('@line/bot-sdk').middleware;
const config = require('./lineBotConfig.json');

router.post('/', middleware(config), controller.lineEntry);



export default router;