import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import TABLES from '../constants/tables.mjs';
import { ENDPOINTS, API_PATH } from '../constants/api.mjs';
import { queryRecordsAll, insertRecord } from './sql.mjs';

const SALT_ROUNDS = 10;

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.API_PORT || 3000;

export const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conn.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL database = ', err);
    return;
  }
  console.log('MySQL successfully connected!');
});

function getRecordsAll(endpoint, tableName) {
  app.get(`/${API_PATH}/${endpoint}/`, async (req, res) => {
    queryRecordsAll(conn, res, tableName);
  });
}

function getRecordById(endpoint, table) {
  app.get(`/${API_PATH}/${endpoint}/:id`, async (req, res) => {
    queryRecordByAttribute(conn, res, table, 'id', req.params.id);
  });
}

function getUserByUsername() {
  app.get(`/${API_PATH}/${ENDPOINTS.users}/:username`, async (req, res) => {
    queryRecordByAttribute(
      conn,
      res,
      TABLES.users,
      'username',
      req.params.username,
    );
  });
}

function authorize() {
  app.post(`/${API_PATH}/${ENDPOINTS.auth}`, async (req, res) => {
    const { email, password: submittedPassword } = req.body;

    const queryString = `SELECT * FROM ${TABLES.users} WHERE email = ?`;

    conn.query(queryString, [email], async (err, results) => {
      if (err) {
        console.error('Database error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      if (results.length > 0) {
        const user = results[0];
        bcrypt.compare(
          submittedPassword,
          user.password,
          function (err, result) {
            if (err) throw err;
            res.send(result ? 'true' : 'false');
          },
        );
      }
    });
  });
}

async function createUser() {
  app.post(`/${API_PATH}/${ENDPOINTS.users}`, (req, res) => {
    const { firstName, lastName, password: inputPassword, email } = req.body;

    bcrypt.hash(inputPassword, SALT_ROUNDS, function (err, hashedPassword) {
      if (err) {
        console.error('Error hashing password:', err);
        return res
          .status(500)
          .json({ success: false, message: 'Server error' });
      }

      const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

      insertRecord(
        conn,
        res,
        TABLES.users,
        'firstName, lastName, password, email, joined',
        [firstName, lastName, hashedPassword, email, createdAt],
      );
    });
  });
}

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

getRecordsAll(ENDPOINTS.users, TABLES.users);
authorize();
createUser();