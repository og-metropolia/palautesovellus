import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import TABLES from '../constants/tables.mjs';
import { ENDPOINTS, API_PATH } from '../constants/api.mjs';
import {
  queryRecordsAll,
  insertRecord,
  queryRecordByAttribute,
} from './sql.mjs';

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
        bcrypt.compare(submittedPassword, user.password, (err, result) => {
          if (err) throw err;
          res.status(200).json({
            code: 200,
            successful: result ? true : false,
            user_id: results[0].teacher_id,
          });
        });
      } else {
        console.error('Database error: ', err);
        return res.status(400).send('User not found');
      }
    });
  });
}

async function createUser() {
  app.post(`/${API_PATH}/${ENDPOINTS.users}`, (req, res) => {
    const { firstName, lastName, password: inputPassword, email } = req.body;

    const userExists = checkExistingUser(email);

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with given email',
      });
    }

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

async function createQuestion() {
  app.post(`/${API_PATH}/${ENDPOINTS.question}`, (req, res) => {
    const { session_id, theme, content, answer_type } = req.body;

    try {
      insertRecord(
        conn,
        res,
        TABLES.question,
        'session_id, theme, content, answer_type',
        [session_id, theme, content, answer_type],
      );
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

async function createSession() {
  app.post(`/${API_PATH}/${ENDPOINTS.session}`, (req, res) => {
    const { teacher_id } = req.body;
    const moment = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      const createdSession = insertRecord(
        conn,
        res,
        TABLES.session,
        'teacher_id, moment',
        [teacher_id, moment],
      );
      return createdSession;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

function checkExistingUser(email) {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM ${TABLES.users} WHERE email = ?`;

    conn.query(queryString, [email], (err, results) => {
      if (err) {
        console.error('Database error: ', err);
        reject(err);
      }

      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function queryQuestionsBySessionId() {
  app.get(`/${API_PATH}/${ENDPOINTS.question}`, (req, res) => {
    const { session_id } = req.query;

    const queryString = `SELECT * FROM ${TABLES.question} WHERE session_id = ?`;

    conn.query(queryString, [session_id], (err, results) => {
      if (err) {
        console.error('Database error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      return res.status(200).json({
        code: 200,
        questions: results,
      });
    });
  });
}

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

getRecordsAll(ENDPOINTS.users, TABLES.users);
authorize();
createUser();
createQuestion();
createSession();
queryQuestionsBySessionId();
