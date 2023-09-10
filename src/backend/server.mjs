import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import TABLES from '../constants/tables.mjs';
import { ENDPOINTS, API_PATH } from '../constants/api.mjs';
import { queryRecordsAll } from './sql.mjs';

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

export function authorize() {
  app.post(`/${API_PATH}/${ENDPOINTS.auth}`, async (req, res) => {
    const { email, password: submittedPassword } = req.body;

    const queryString = `SELECT * FROM ${TABLES.users} WHERE sposti = ?`;

    conn.query(queryString, [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Internal Server Error');
      }

      if (results.length > 0) {
        const user = results[0];
        bcrypt.compare(
          submittedPassword,
          user.salasana,
          function (err, result) {
            if (err) throw err;
            res.send(result ? 'true' : 'false');
          },
        );
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

getRecordsAll(ENDPOINTS.users, TABLES.users);
authorize();
