import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './write-feedback.css'; // Import the CSS

const WriteFeedback = (props) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (event) => {
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
