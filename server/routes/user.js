const express = require('express');
const router = express.Router();
const db = require('../db');
const md5 = require('md5');

// 登录接口
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query(
    'SELECT * FROM db_users WHERE username = ? AND password = ?',
    [username, md5(password)]
  );
  if (rows.length > 0) {
    res.json({ code: 0, data: rows[0], msg: '登录成功' });
  } else {
    res.json({ code: 1, msg: '用户名或密码错误' });
  }
});

// 获取当前用户信息
router.get('/info', async (req, res) => {
  const userId = req.query.id;
  const [rows] = await db.query(
    'SELECT id, username, email, user_img FROM db_users WHERE id = ?',
    [userId]
  );
  res.json({ code: 0, data: rows[0] });
});

// 修改用户名
router.post('/update', async (req, res) => {
  const { id, username } = req.body;
  await db.query('UPDATE db_users SET username = ? WHERE id = ?', [username, id]);
  res.json({ code: 0, msg: '用户名已更新' });
});

module.exports = router;