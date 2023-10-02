import React, { useState, useContext } from 'react';
import './write-feedback.css';
import AnswerContext from './AnswerContext.jsx';

const WriteFeedback = (props) => {
  const [feedback, setFeedback] = useState('');
  const answerContext = useContext(AnswerContext);

  const handleFeedbackChange = (event) => {
    answerContext[props.index] = event.target.value;
    setFeedback(event.target.value);
  };

  const submitFeedback = () => {
    console.log('Palaute lähetetty:', feedback);
  };

  return (
    <div className="WriteContainer">
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        rows={5}
        placeholder="Kirjoita palaute tähän..."
        className="textArea"
        style={{
          color: props.color,
          backgroundColor: props.backgroundColor,
        }}
      />
    </div>
  );
};

export default WriteFeedback;
