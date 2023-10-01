import React, { useState } from 'react';
import {
  FaSmile,
  FaMeh,
  FaFrown,
  FaAngry,
  FaLaugh,
  FaSurprise,
  FaGrin,
  FaTired,
} from 'react-icons/fa';
import colors from '../constants/colors.mjs';
import './emoji-feedback.css';

const EmojiFeedback = (props) => {
  const [selectedEmoji, setSelectedEmoji] = props.state;

  const emojis = {
    happy: <FaSmile />,
    smile: <FaLaugh />,
    wink: <FaGrin />,
    neutral: <FaMeh />,
    sad: <FaFrown />,
    angry: <FaAngry />,
    surprised: <FaSurprise />,
    tired: <FaTired />,
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <div
      className="EmojiContainer"
      style={{ backgroundColor: props.bgColor || colors.white }}>
      {Object.entries(emojis).map(([key, iconComponent]) => (
        <span
          key={key}
          className="emoji"
          style={{
            color: props.fgColor || colors.black,
            opacity: selectedEmoji && selectedEmoji !== key ? 0.5 : 1,
          }}
          onClick={() => handleEmojiClick(key)}>
          {iconComponent}
        </span>
      ))}
    </div>
  );
};

export default EmojiFeedback;
