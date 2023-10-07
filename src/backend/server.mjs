import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import TABLES from '../constants/tables.mjs';
import { ENDPOINTS, API_PATH } from '../constants/api.mjs';
import { queryRecordsAll, insertRecord, deleteRecord } from './sql.mjs';

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
    const { email, password: submittedPassword, is_admin } = req.body;

    if (is_admin) {
      const queryString = `SELECT * FROM ${TABLES.admin} WHERE email = ?`;

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
              user_id: results[0].admin_id,
            });
          });
        } else {
          console.error('Database error: ', err);
          return res.status(400).json({
            code: 400,
            successful: false,
          });
        }
      });
    } else {
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
          return res.status(400).json({
            code: 400,
            successful: false,
          });
        }
      });
    }
  });
}

async function createUser() {
  app.post(`/${API_PATH}/${ENDPOINTS.users}`, async (req, res) => {
    const { firstName, lastName, password: inputPassword, email } = req.body;

    const userExists = await checkExistingUser(email);
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with given email',
        code: 400,
      });
    }

    bcrypt.hash(inputPassword, SALT_ROUNDS, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res
          .status(500)
          .json({ success: false, message: 'Server error', code: 500 });
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
      return res
        .status(500)
        .json({ success: false, message: 'Server error', code: 500 });
    }
  });
}
async function createAnswer() {
  app.post(`/${API_PATH}/${ENDPOINTS.answer}`, (req, res) => {
    const { question_id, message, responder, moment } = req.body;

    try {
      insertRecord(
        conn,
        res,
        TABLES.answer,
        'question_id, message, responder, moment',
        [question_id, message, responder, moment],
      );
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Server error', code: 500 });
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
      res
        .status(500)
        .json({ success: false, message: 'Server error', code: 500 });
    }
  });
}

function checkExistingUser(email) {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM ${TABLES.users} WHERE email = ?`;

    console.log('Checking if user exists with email: ', email);

    conn.query(queryString, [email], (err, results) => {
      if (err) {
        console.error('Database error: ', err);
        resolve(true);
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
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error',
        });
      }

      return res.status(200).json({
        code: 200,
        results: results,
      });
    });
  });
}

function querySessionsByTeacherId() {
  app.get(`/${API_PATH}/${ENDPOINTS.session}`, (req, res) => {
    const { teacher_id } = req.query;

    const queryString = `SELECT * FROM ${TABLES.session} WHERE teacher_id = ?`;

    conn.query(queryString, [teacher_id], (err, results) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error',
        });
      }

      return res.status(200).json({
        code: 200,
        results: results,
      });
    });
  });
}

function queryAnswersByQuestionId() {
  app.get(`/${API_PATH}/${ENDPOINTS.answer}`, (req, res) => {
    const { question_id } = req.query;

    const queryString = `SELECT * FROM ${TABLES.answer} WHERE question_id = ?`;

    conn.query(queryString, [question_id], (err, results) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          message: 'Internal Server Error',
        });
      }

      return res.status(200).json({
        code: 200,
        results: results,
      });
    });
  });
}

function deleteUser() {
  app.delete(`/${API_PATH}/${ENDPOINTS.users}/:id`, (req, res) => {
    deleteRecord(conn, res, TABLES.users, req.params.id, 'teacher_id');
  });
}

function printResults() {
  app.get(
    `/${API_PATH}/${ENDPOINTS.print}/:teacher_id/:session_id`,
    (req, res) => {
      const teacher_id = req.params.teacher_id;
      const session_id = req.params.session_id;
      console.log([teacher_id]);
      console.log([session_id]);

      const queryString = `
      SELECT
      s.teacher_id,
      s.session_id,
      q.question_id,
      q.content,
      q.answer_type,
      a.answer_id,
      a.message
      FROM Session s
      JOIN Question q ON s.session_id = q.session_id
      LEFT JOIN Answer a ON q.question_id = a.question_id
      WHERE s.teacher_id = ?
      AND s.session_id = ?
    `;

      conn.query(queryString, [teacher_id, session_id], (err, results) => {
        if (err) {
          console.error('Database error: ', err);
          return res.status(500).send('Internal Server Error');
        }

        return res.status(200).json({
          code: 200,
          results: results,
        });
      });
    },
  );
}

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

getRecordsAll(ENDPOINTS.users, TABLES.users);
authorize();
createUser();
createQuestion();
createAnswer();
createSession();
queryQuestionsBySessionId();
querySessionsByTeacherId();
queryAnswersByQuestionId();
deleteUser();
printResults();
