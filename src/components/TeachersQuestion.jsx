import React, { useState } from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ENDPOINTS, BASE_URL } from '../constants/api.mjs';
import { QUESTION_TYPES } from '../constants/question-types.mjs';
import routes from '../constants/routes.mjs';
import { QUESTION_THEMES } from '../constants/questions.mjs';

export default function TeachersQuestion(props) {
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
    newQuestions[index][type] = !newQuestions[index][type];
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
      alert('Valitse aihe kysymyksille ennen lähettämistä');
      return;
    } else if (questions.length === 0) {
      alert('Luo ainakin yksi kysymys ennen lähettämistä');
      return;
    } else if (questions.some((q) => q.content === '')) {
      alert('Täytä kaikki kysymykset ennen lähettämistä');
      return;
    } else if (questions.some((q) => !q.emoji && !q.draw && !q.write)) {
      alert('Valitse vastauksien tyypit ennen lähettämistä');
      return;
    }

    const userId = window.localStorage.getItem('teacherId');

    if (!userId) {
      alert('Et ole kirjautunut sisään');
      window.location.href = routes.dashboard;
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

        alert('Kysymykset lähetetty');
        window.location.reload();
      });
  };

  return (
    <div style={{ padding: '20px', width: '60%', borderRadius: '20px' }}>
      <h1
        style={{
          color: props.color,
          backgroundColor: props.backgroundColor,
          borderRadius: '10px',
        }}>
        Kysymykset
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ margin: 0, color: 'black', fontWeight: 'bold' }}>
          Valitse aihe
        </p>
        <FormControl fullWidth variant="filled">
          <Select
            displayEmpty
            labelId="topic-label"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            sx={{
              color: '#a9a9a9',
              backgroundColor: '#f0f0f0',
            }}
            placeholder="aihe">
            <MenuItem value="" disabled>
              Aihe...
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.math.id}>
              {QUESTION_THEMES.math.displayName}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.language.id}>
              {QUESTION_THEMES.language.displayName}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.play.id}>
              {QUESTION_THEMES.play.displayName}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.journey.id}>
              {QUESTION_THEMES.journey.displayName}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.sport.id}>
              {QUESTION_THEMES.sport.displayName}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.task.id}>
              {QUESTION_THEMES.task.displayName}
            </MenuItem>
            <MenuItem value={QUESTION_THEMES.mood.id}>
              {QUESTION_THEMES.mood.displayName}
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
            placeholder="Kirjoita kysymys tähän..."
            sx={{ backgroundColor: 'white', marginBottom: '10px' }} // Asetetaan taustaväri valkoiseksi
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
                Valitse vastauksen tyyppi:
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}>
                <label style={{ order: 2 }} htmlFor={`emoji-${index}`}>
                  Emoji-vastaus
                </label>
                <Checkbox
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
                  Piirto-vastaus
                </label>
                <Checkbox
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
                  Kirjoitus-vastaus
                </label>
                <Checkbox
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
        variant="contained"
        color="primary"
        style={{ marginTop: '20px', marginRight: '10px' }}
        onClick={addQuestion}>
        Lisää kysymys
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}>
        Lähetä kysymykset
      </Button>
    </div>
  );
}
