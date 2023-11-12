import './write-feedback.css';
import React, { useState, useContext } from 'react';
import AnswerContext from './AnswerContext.jsx';
import { useTranslation } from 'react-i18next';

const WriteFeedback = (props) => {
  const [feedback, setFeedback] = useState('');
  const answerContext = useContext(AnswerContext);
  const { t } = useTranslation();

  const handleFeedbackChange = (event) => {
    answerContext[props.index] = {
      question_id: props.question_id,
      content: event.target.value,
    };
    setFeedback(event.target.value);
  };

  return (
    <div className="write-container">
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        rows={5}
        placeholder={t('session.writeHereHint')}
        className="text-area"
        style={{
          color: props.color,
          backgroundColor: props.backgroundColor,
        }}
      />
    </div>
  );
};

export default WriteFeedback;
