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
        <div className="container">
            <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                rows={5}
                placeholder="Kirjoita palaute tähän..."
                className="textArea"
                style={{
                    color: props.color,
                    backgroundColor: props.backgroundColor
                }}
            />
            <button onClick={submitFeedback} className="button" style={{
                color: props.fgColor,
                backgroundColor: props.bgColor
            }}>
                <FaPaperPlane style={{ marginRight: '5px' }} />
                Lähetä
            </button>
        </div>
    );
};

export default WriteFeedback;

