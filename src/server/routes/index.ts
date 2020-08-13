/**
 * @description express的首頁路由
 * @author frenkie
 * @date 2020-08-05
 */

import express from 'express';
const router = express.Router();

let title = 'DonHand - 助手(驢驢)';

router.get('/', (req, res) => {
  res.render('index', { title: title});
});
router.get('/TermsOfUse', (req, res) => {
  res.render('TermsOfUse', { title: title});
});

export default router;