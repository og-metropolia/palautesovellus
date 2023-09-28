import React, { useState } from 'react';
import { FaSmile, FaMeh, FaFrown, FaAngry, FaLaugh, FaSurprise, FaGrin, FaTired } from 'react-icons/fa';
import colors from '../constants/colors.mjs';
import './emoji-feedback.css';  // Import the CSS

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
        <div className="container">
            {Object.entries(emojis).map(([key, iconComponent]) => (
                <span
                    key={key}
                    className="emoji"
                    style={{
                        color: props.fgColor,
                        opacity: selectedEmoji && selectedEmoji !== key ? 0.5 : 1
                    }}
                    onClick={() => handleEmojiClick(key)}
                >
                    {iconComponent}
                </span>
            ))}
        </div>
    );
};

export default EmojiFeedback;
