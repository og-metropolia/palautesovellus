import './write-feedback.css';
import React, { useState, useContext } from 'react';
import AnswerContext from './AnswerContext.jsx';

const WriteFeedback = (props) => {
  const [feedback, setFeedback] = useState('');
  const answerContext = useContext(AnswerContext);

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
        placeholder="Kirjoita palaute tähän..."
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
