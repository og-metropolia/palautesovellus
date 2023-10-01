import './session.css';
import React, { useState, useEffect } from 'react';
import { QUESTION_THEMES } from '../constants/questions.mjs';
import { QUESTION_TYPES } from '../constants/question-types.mjs';
import colors from '../constants/colors.mjs';
import { BASE_URL, ENDPOINTS } from '../constants/api';
import { FaPaperPlane } from 'react-icons/fa';

import DrawFeedback from '../components/DrawFeedback';
import EmojiFeedback from '../components/EmojiFeedback';
import WriteFeedback from '../components/WriteFeedback';

function getThemeForValue(value) {
  for (const theme in QUESTION_THEMES) {
    if (QUESTION_THEMES[theme].id === value) {
      return QUESTION_THEMES[theme];
    }
  }
  return null;
}

export default function Session(props) {
  const [data, setData] = useState();
  const id = props.match.params.id;

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(`${BASE_URL}/${ENDPOINTS.question}?session_id=${id}`)
      ).json();

      setData(data);
    };

    dataFetch();
  }, []);

  return (
    <>
      {data &&
        data.questions.map((question) => {
          const theme = getThemeForValue(question.theme);

          return (
            <div
              className="question"
              key={question.question_id}
              style={{ backgroundColor: theme.backgroundColor }}>
              <h1 style={{ color: theme.color }}>{data && question.content}</h1>

              {question.answer_type === QUESTION_TYPES.draw && (
                <DrawFeedback fgColor={theme.color} bgColor={theme.bgColor} />
              )}

              {question.answer_type === QUESTION_TYPES.emoji && (
                <EmojiFeedback fgColor={theme.color} bgColor={theme.bgColor} />
              )}

              {question.answer_type === QUESTION_TYPES.write && (
                <WriteFeedback fgColor={theme.color} bgColor={theme.bgColor} />
              )}
            </div>
          );
        })}
      <div className="submit-container">
        <button
          className="session-button"
          style={{
            backgroundColor:
              // getThemeForValue(data?.questions[0]?.theme).neutralColor ||
              colors.white,
            color: colors.black,
          }}
          onClick={() => {}}>
          <FaPaperPlane style={{ marginRight: '5px' }} />
          Lähetä
        </button>
      </div>
    </>
  );
}
