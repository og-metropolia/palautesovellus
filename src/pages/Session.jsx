import './session.css';
import React, { useState, useEffect } from 'react';
import { QUESTION_THEMES } from '../constants/questions.mjs';
import { QUESTION_TYPES } from '../constants/question-types.mjs';
import colors from '../constants/colors.mjs';
import { BASE_URL, ENDPOINTS } from '../constants/api';
import ROUTES from '../constants/routes';
import { FaPaperPlane } from 'react-icons/fa';
import AnswerContext from '../components/AnswerContext';
import DrawFeedback from '../components/DrawFeedback';
import EmojiFeedback from '../components/EmojiFeedback';
import WriteFeedback from '../components/WriteFeedback';
import { v4 as uuidv4 } from 'uuid';

function getThemeForValue(value) {
  for (const theme in QUESTION_THEMES) {
    if (QUESTION_THEMES[theme].id === value) {
      return QUESTION_THEMES[theme];
    }
  }
  return null;
}

export default function Session(props) {
  const answers = [];

  const [data, setData] = useState();
  const id = props.match.params.id;

  const moment = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const responder = uuidv4();

  const submitAnswer = async () => {
    try {
      for (let i = 0; i < answers.length; ++i) {
        if (!answers[i]) continue;
        fetch(`${BASE_URL}/${ENDPOINTS.answer}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question_id: answers[i].question_id,
            message: answers[i].content,
            responder: responder,
            moment: moment,
          }),
        });
      }
    } catch (error) {
      alert('Virhe vastauksien tallennuksessa:');
    }

    alert('Vastaukset tallennettu!');
    window.location.href = ROUTES.thanks;
  };

  useEffect(() => {
    const dataFetch = async () => {
      const fetchedData = await (
        await fetch(`${BASE_URL}/${ENDPOINTS.question}?session_id=${id}`)
      ).json();

      setData(fetchedData);
    };

    dataFetch();
  }, [id]);

  return (
    <>
      <div className="session-background">
        <img src="/assets/session_background.jpg"></img>
      </div>
      <AnswerContext.Provider value={answers}>
        <div className="question-all">
          {data &&
            data.results &&
            data.results.length > 0 &&
            data.results.map((question, index) => {
              const theme = getThemeForValue(question.theme);

              return (
                <div
                  className="question"
                  key={question.question_id}
                  style={{ backgroundColor: theme.backgroundColor }}>
                  <h1 style={{ color: theme.color }}>
                    {data && question.content}
                  </h1>

                  {question.answer_type === QUESTION_TYPES.draw && (
                    <DrawFeedback
                      fgColor={theme.color}
                      bgColor={theme.bgColor}
                      index={index}
                      question_id={question.question_id}
                    />
                  )}

                  {question.answer_type === QUESTION_TYPES.emoji && (
                    <EmojiFeedback
                      fgColor={theme.color}
                      bgColor={theme.bgColor}
                      index={index}
                      question_id={question.question_id}
                    />
                  )}

                  {question.answer_type === QUESTION_TYPES.write && (
                    <WriteFeedback
                      fgColor={theme.color}
                      bgColor={theme.bgColor}
                      index={index}
                      question_id={question.question_id}
                    />
                  )}
                </div>
              );
            })}
        </div>
        <div className="submit-container">
          <button
            className="session-button"
            style={{
              backgroundColor: colors.white,
              color: colors.black,
            }}
            onClick={submitAnswer}>
            <FaPaperPlane style={{ marginRight: '5px' }} />
            Lähetä
          </button>
        </div>
      </AnswerContext.Provider>
    </>
  );
}
