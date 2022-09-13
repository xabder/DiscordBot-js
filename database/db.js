require('dotenv').config({ path: 'E:/envfiles/.env' });

const mysql = require('mysql2/promise');

mysql
  .createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
  })
  .then((connection) => {
    console.log('Connected to database.');
    connection.end();
  })
  .catch((err) => {
    console.log(err);
  });
