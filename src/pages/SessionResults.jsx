import './sessionresults.css';
import React, { useEffect, useState } from 'react';
import routes from '../constants/routes.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import { BASE_URL, ENDPOINTS } from '../constants/api';
import { QUESTION_TYPES } from '../constants/question-types.mjs';
import { QUESTION_THEMES } from '../constants/questions.mjs';
import { getQrCodeForUrl } from '../utils/qr-code.mjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LinkIcon from '@mui/icons-material/Link';
import { ButtonGroup } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { emojis } from '../components/EmojiFeedback.jsx';

function getSessionUrl(id) {
  return `${window.location.protocol}//${window.location.hostname}${
    window.location.port !== 403 ? ':' + window.location.port : ''
  }/session/${id}`;
}

function getEmojiFromName(name) {
  for (let i = 0; i < emojis.length; i++) {
    if (emojis[i].name === name) {
      return emojis[i].icon;
    }
  }
  return <div>?</div>;
}

export default function SessionResults(props) {
  const id = props.match.params.id;
  const [questions, setQuestions] = useState();
  const [answerMarkup, setAnswerMarkup] = useState();
  const [emojiStats, setEmojiStats] = useState([]);
  const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  useEffect(() => {
    const dataFetch = async () => {
      const fetchedQuestionData = await (
        await fetch(`${BASE_URL}/${ENDPOINTS.question}?session_id=${id}`)
      ).json();

      setQuestions(fetchedQuestionData.results);
    };

    dataFetch();
  }, [id]);

  const dataFetch = async (id) => {
    const fetchedData = await (
      await fetch(`${BASE_URL}/${ENDPOINTS.answer}?question_id=${id}`)
    ).json();

    let prevQuestionType;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question_id === id) {
        prevQuestionType = questions[i].answer_type;
        break;
      }
    }

    const answers = fetchedData.results;

    setAnswerMarkup(
      answers &&
        answers.map((answer) => (
          <>
            {prevQuestionType === QUESTION_TYPES.draw ? (
              <img
                src={answer.message}
                className="answer-drawing"
                alt="piirros"
              />
            ) : prevQuestionType === QUESTION_TYPES.emoji ? (
              <div className="answer-emoji">
                {getEmojiFromName(answer.message)}
              </div>
            ) : prevQuestionType === QUESTION_TYPES.write ? (
              <p className="answer-text">{answer.message}</p>
            ) : (
              ''
            )}
          </>
        )),
    );
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="questionlist-container">
        Ei kyselyjä saatavilla tai ladataan kyselyitä...
      </div>
    );
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return <div>Ei kysymyksiä saatavilla tai ladataan kysymyksiä...</div>;
  }

  if (!userId) {
    window.location.href = routes.login;
  }

  return (
    <div className="question-container">
      <div className="questionlist-container">
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            title="Takaisin"
            className="custom-back-button"
            onClick={() => (window.location.href = routes.dashboard)}
            style={{ color: 'white' }}>
            <ArrowBackIcon />
          </Button>
          <Button
            title="Kopioi kyselyn linkki"
            onClick={() => {
              navigator.clipboard.writeText(
                getSessionUrl(props.match.params.id),
              );
            }}
            style={{ color: 'white' }}>
            <LinkIcon />
          </Button>
          <Button
            title="Kopioi kyselyn QR-koodin linkki"
            onClick={() => {
              navigator.clipboard.writeText(
                getQrCodeForUrl(getSessionUrl(props.match.params.id)),
              );
            }}
            style={{ color: 'white' }}>
            <QrCodeIcon />
          </Button>
          <Button
            title="Tulosta kysely"
            onClick={() => {
              // TODO
              alert('Tulostus ei ole vielä käytössä.');
            }}
            style={{ color: 'white' }}>
            <PrintIcon />
          </Button>
        </ButtonGroup>
        <h2>Kysymykset</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.question_id}>
              <button
                onClick={() => {
                  dataFetch(question.question_id);
                }}>
                {question.content}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="answer-container">{answerMarkup}</div>
    </div>
  );
}
