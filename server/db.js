const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',      // 数据库地址
  user: 'root',           // 数据库用户名（请修改为你的）
  password: 'yourpass',   // 数据库密码（请修改为你的）
  database: 'newsmanagement'
});
module.exports = pool.promise();