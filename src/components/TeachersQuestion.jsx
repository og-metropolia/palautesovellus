import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Radio,
} from '@mui/material';
import { ENDPOINTS, BASE_URL } from '../constants/api.mjs';
import { QUESTION_TYPES } from '../constants/question-types.mjs';
import ROUTES from '../constants/routes.mjs';
import { QUESTION_THEMES } from '../constants/questions.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import { useTranslation } from 'react-i18next';

export default function TeachersQuestion(props) {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([
    { content: '', emoji: false, draw: false, write: false },
  ]);
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].content = value;
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (index, type) => {
    const newQuestions = [...questions];

    newQuestions[index].emoji = false;
    newQuestions[index].draw = false;
    newQuestions[index].write = false;

    newQuestions[index][type] = true;

    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { content: '', emoji: false, draw: false, write: false },
    ]);
  };

  const handleSubmit = () => {
    if (!selectedTopic || selectedTopic === '') {
      alert(t('dashboard.alerts.selectTopic'));
      return;
    } else if (questions.length === 0) {
      alert(t('dashboard.alerts.createQuestion'));
      return;
    } else if (questions.some((q) => q.content === '')) {
      alert(t('dashboard.alerts.fillAllQuestions'));
      return;
    } else if (questions.some((q) => !q.emoji && !q.draw && !q.write)) {
      alert(t('dashboard.alerts.chooseAnswerType'));
      return;
    }

    const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);

    if (!userId) {
      alert(t('dashboard.alerts.notLoggedIn'));
      window.location.href = ROUTES.dashboard;
    }

    fetch(`${BASE_URL}/${ENDPOINTS.session}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teacher_id: Number(userId),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const sessionId = data.id;

        for (let i = 0; i < questions.length; i++) {
          const selectedAnswerType = questions[i].emoji
            ? QUESTION_TYPES.emoji
            : questions[i].draw
            ? QUESTION_TYPES.draw
            : questions[i].write
            ? QUESTION_TYPES.write
            : null;

          fetch(`${BASE_URL}/${ENDPOINTS.question}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              session_id: sessionId,
              theme: selectedTopic,
              content: questions[i].content,
              answer_type: selectedAnswerType,
            }),
          });
        }

        alert(t('dashboard.alerts.questionsSent'));
        window.location.reload();
      });
  };

  return (
    <div style={{ padding: '20px', width: '90%', borderRadius: '20px' }}>
      <h1
        style={{
          color: props.color,
          backgroundColor: props.backgroundColor,
          borderRadius: '10px',
        }}>
        {t('dashboard.questionsHeading')}
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ margin: 0, color: 'black', fontWeight: 'bold' }}>
          {t('dashboard.pickQuestionHeading')}
        </p>

        <FormControl fullWidth variant="filled">
          <Select
            displayEmpty
            labelId="topic-label"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            sx={{
              color: selectedTopic ? 'black' : '#a9a9a9',
              backgroundColor: '#f0f0f0',
            }}
            placeholder="aihe">
            <MenuItem value="" disabled>
              {t('dashboard.questionPickHint')}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.math.id}>
              {t(QUESTION_THEMES.math.textId)}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.language.id}>
              {t(QUESTION_THEMES.language.textId)}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.play.id}>
              {t(QUESTION_THEMES.play.textId)}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.journey.id}>
              {t(QUESTION_THEMES.journey.textId)}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.sport.id}>
              {t(QUESTION_THEMES.sport.textId)}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.task.id}>
              {t(QUESTION_THEMES.task.textId)}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.mood.id}>
              {t(QUESTION_THEMES.mood.textId)}
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="filled"
            value={q.content}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            placeholder={t('dashboard.questionContentFieldHint')}
            sx={{ backgroundColor: 'white', marginBottom: '10px' }}
          />

          <div
            style={{
              padding: '20px',
              backgroundColor: '#eaeaea',
              borderRadius: '10px',
              color: props.color,
              marginBottom: '20px',
            }}>
            <FormControl component="fieldset" style={{ marginTop: '10px' }}>
              <p style={{ margin: 0, color: 'black', fontWeight: 'bold' }}>
                {t('dashboard.pickAnswerTypeHeading')}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}>
                <label style={{ order: 2 }} htmlFor={`emoji-${index}`}>
                  {t('dashboard.answerType.emoji')}
                </label>
                <Radio
                  style={{ order: 1 }}
                  checked={q.emoji}
                  onChange={() => handleCheckboxChange(index, 'emoji')}
                  name={`emoji-${index}`}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}>
                <label style={{ order: 2 }} htmlFor={`draw-${index}`}>
                  {t('dashboard.answerType.draw')}
                </label>
                <Radio
                  style={{ order: 1 }}
                  checked={q.draw}
                  onChange={() => handleCheckboxChange(index, 'draw')}
                  name={`draw-${index}`}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}>
                <label style={{ order: 2 }} htmlFor={`write-${index}`}>
                  {t('dashboard.answerType.write')}
                </label>
                <Radio
                  style={{ order: 1 }}
                  checked={q.write}
                  onChange={() => handleCheckboxChange(index, 'write')}
                  name={`write-${index}`}
                />
              </div>
            </FormControl>
          </div>
        </div>
      ))}

      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: '20px', marginRight: '10px', marginLeft: '10px' }}
        onClick={addQuestion}>
        {t('dashboard.addQuestionButton')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}>
        {t('dashboard.createSession')}
      </Button>
    </div>
  );
}
