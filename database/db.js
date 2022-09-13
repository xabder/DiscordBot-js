require('dotenv').config({ path: 'E:/envfiles/.env' });

const mysql = require('mysql2/promise');

mysql
  .createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  })
  .then((connection) => {
    console.log('Connected to database.');
    connection.end();
  })
  .catch((err) => {
    console.log(err);
  });
