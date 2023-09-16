import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const WriteFeedback = (props) => {
    const [feedback, setFeedback] = useState('');

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const submitFeedback = () => {
        console.log('Palaute lähetetty:', feedback);
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                rows={5}
                placeholder="Kirjoita palaute tähän..."
                style={{ width: '100%', marginBottom: '20px', color: props.color, backgroundColor: props.backgroundColor }}
            />
            <button onClick={submitFeedback} style={{ display: 'flex', alignItems: 'center', fontSize: '18px', color: props.fgColor, backgroundColor: props.bgColor }}>
                <FaPaperPlane style={{ marginRight: '5px' }} />
                Lähetä
            </button>
        </div>
    );
};

export default WriteFeedback;
