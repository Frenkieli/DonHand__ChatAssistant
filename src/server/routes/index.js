/**
 * @description express的首頁路由
 * @author frenkie
 * @date 2020-08-05
 */

import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', { title: 'linebot_crawler'});
});

export default router;