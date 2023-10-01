import './session.css';
import React, { useState, useEffect, createContext } from 'react';
import { QUESTION_THEMES } from '../constants/questions.mjs';
import { QUESTION_TYPES } from '../constants/question-types.mjs';
import colors from '../constants/colors.mjs';
import { BASE_URL, ENDPOINTS } from '../constants/api';
import { FaPaperPlane } from 'react-icons/fa';

import DrawFeedback from '../components/DrawFeedback';
import EmojiFeedback from '../components/EmojiFeedback';
import WriteFeedback from '../components/WriteFeedback';

// Luo konteksti vastauksille.
export const answerContext = createContext([]);

// Funktio, joka palauttaa teeman arvon perusteella.
function getThemeForValue(value) {
  for (const theme in QUESTION_THEMES) {
    if (QUESTION_THEMES[theme].id === value) {
      return QUESTION_THEMES[theme];
    }
  }
  return null;
}

export default function Session(props) {
  // Käytä tilahakukoukkuja datan ja vastausten tallentamiseen.
  const [data, setData] = useState();
  const [answers, setAnswer] = useState([]);
  const id = props.match.params.id;

  // Funktio vastausten lähettämiseen palvelimelle.
  const submitAnswer = async () => {
    try {
      console.log('Vastaukset:', answers);
      const response = await fetch(`${BASE_URL}/${ENDPOINTS.submit}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: id,
          answers: answers,
        }),
      });

      if (response.ok) {
        console.log('Vastaukset tallennettu onnistuneesti!');
      } else {
        console.error('Vastauksien tallennus epäonnistui!');
      }
    } catch (error) {
      console.error('Virhe vastauksien tallennuksessa:', error);
    }
  };

  // Käytä vaikutushakukoukkua datan hakemiseen alussa.
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
      {/* Iteroi läpi kysymykset ja luo niille vastaavat komponentit. */}
      {data &&
        data.questions.map((question, index) => {
          const theme = getThemeForValue(question.theme);

          return (
            <div
              className="question"
              key={question.question_id}
              style={{ backgroundColor: theme.backgroundColor }}>
              <h1 style={{ color: theme.color }}>{data && question.content}</h1>

              {/* Jos vastaustyyppi on piirros, luo DrawFeedback-komponentti. */}
              {question.answer_type === QUESTION_TYPES.draw && (
                <DrawFeedback
                  fgColor={theme.color}
                  bgColor={theme.bgColor}
                  onSave={(drawingData) => {
                    setAnswer(...answers, drawingData);
                  }}
                />
              )}

              {/* Jos vastaustyyppi on emoji, luo EmojiFeedback-komponentti. */}
              {question.answer_type === QUESTION_TYPES.emoji && (
                <EmojiFeedback
                  fgColor={theme.color}
                  bgColor={theme.bgColor}
                  state={answers[index]}
                />
              )}

              {/* Jos vastaustyyppi on kirjoitus, luo WriteFeedback-komponentti. */}
              {question.answer_type === QUESTION_TYPES.write && (
                <WriteFeedback fgColor={theme.color} bgColor={theme.bgColor} />
              )}
            </div>
          );
        })}
      <div className="submit-container">
        {/* Lähetä-painike, joka lähettää vastaukset palvelimelle. */}
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
    </>
  );
}
