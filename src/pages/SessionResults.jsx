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
import EmojiRating from '../components/EmojiRating.jsx';
import { CircularProgress, Tooltip } from '@mui/material';

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

function getEmojiIdFromName(name) {
  for (let i = 0; i < emojis.length; i++) {
    if (emojis[i].name === name) {
      return i;
    }
  }
}

export default function SessionResults(props) {
  const id = props.match.params.id;
  const [questions, setQuestions] = useState();
  const [answerMarkup, setAnswerMarkup] = useState();
  const [prevQuestionType, setPrevQuestionType] = useState();
  const [emojiStats, setEmojiStats] = useState({});
  const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  function incrementEmojiStat(emojiName) {
    const emojiId = getEmojiIdFromName(emojiName);
    emojiStats[emojiId] ? emojiStats[emojiId]++ : (emojiStats[emojiId] = 1);
  }

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

    let prevQuestionTypeLocal;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question_id === id) {
        setPrevQuestionType(questions[i].answer_type);
        prevQuestionTypeLocal = questions[i].answer_type;
        break;
      }
    }

    const answers = fetchedData.results;

    setEmojiStats({});

    setAnswerMarkup(
      answers &&
        answers.map((answer) => (
          <>
            {prevQuestionTypeLocal === QUESTION_TYPES.draw ? (
              <img
                src={answer.message}
                className="answer-drawing"
                alt="piirros"
                key={answer.answer_id}
              />
            ) : prevQuestionTypeLocal === QUESTION_TYPES.emoji ? (
              setEmojiStats(incrementEmojiStat(answer.message))
            ) : prevQuestionTypeLocal === QUESTION_TYPES.write ? (
              <p className="answer-text" key={answer.answer_id}>
                {answer.message}
              </p>
            ) : (
              <div key={answer.answer_id}></div>
            )}
          </>
        )),
    );

    prevQuestionTypeLocal === QUESTION_TYPES.emoji &&
      setAnswerMarkup(<EmojiRating stats={emojiStats} />);
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="questionlist-container">
        Ei kyselyjä saatavilla tai ladataan kyselyitä...
        <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
      </div>
    );
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div>
        Ei kysymyksiä saatavilla tai ladataan kysymyksiä...
        <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
      </div>
    );
  }

  if (!userId) {
    window.location.href = routes.login;
  }

  return (
    <div className="question-container">
      <div className="questionlist-container">
        <ButtonGroup variant="text" aria-label="text button group">
          <Tooltip title="Takaisin">
            <Button
              className="custom-back-button"
              onClick={() => (window.location.href = routes.dashboard)}
              style={{ color: 'white' }}>
              <ArrowBackIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Kopioi kyselyn linkki">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  getSessionUrl(props.match.params.id),
                );
              }}
              style={{ color: 'white' }}>
              <LinkIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Kopioi kyselyn QR-koodin linkki">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  getQrCodeForUrl(getSessionUrl(props.match.params.id)),
                );
              }}
              style={{ color: 'white' }}>
              <QrCodeIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Tulosta kysely">
            <Button
              onClick={() => {
                setTimeout(() => {
                  window.print();
                }, 1000); // 1 sekunnin viive
              }}
              style={{ color: 'white' }}>
              <PrintIcon />
            </Button>
          </Tooltip>
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
