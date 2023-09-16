import React, { useState } from 'react';
import { FaSmile, FaMeh, FaFrown, FaAngry, FaLaugh, FaSurprise, FaGrin, FaTired } from 'react-icons/fa';
import colors from '../constants/colors.mjs';

const EmojiFeedback = (props) => {
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const emojis = {
        happy: <FaSmile />,
        smile: <FaLaugh />,
        wink: <FaGrin />,
        neutral: <FaMeh />,
        sad: <FaFrown />,
        angry: <FaAngry />,
        surprised: <FaSurprise />,
        tired: <FaTired />
    };

    const handleEmojiClick = (emoji) => {
        setSelectedEmoji(emoji);
        if (onFeedback) {
            onFeedback(emoji);
        }
    };

    return (
        <div style={{ fontSize: '48px', display: 'flex', justifyContent: 'center' }}>
            {Object.entries(emojis).map(([key, iconComponent]) => (
                <span
                    key={key}
                    style={{ color: props.fgColor, cursor: 'pointer', margin: '0 15px', opacity: selectedEmoji && selectedEmoji !== key ? 0.5 : 1 }}
                    onClick={() => handleEmojiClick(key)}
                >
                    {iconComponent}
                </span>
            ))}
        </div>
    );
};

export default EmojiFeedback;
