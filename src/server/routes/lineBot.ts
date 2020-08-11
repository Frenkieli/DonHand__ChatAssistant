/**
 * @description lineBot的路由
 * @author frenkie
 * @date 2020-08-05
 */
import express from 'express';
const router = express.Router();
import controller from '@@controller/lineBot'

const middleware = require('@line/bot-sdk').middleware;
import config from '@@config/config';
router.post('/', middleware(config.line), controller.lineEntry);



export default router;