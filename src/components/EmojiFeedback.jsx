import React, { useState, useContext } from 'react';
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
import AnswerContext from './AnswerContext.jsx';

const EmojiFeedback = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { icon: <FaSmile />, name: 'happy' },
    { icon: <FaLaugh />, name: 'smile' },
    { icon: <FaGrin />, name: 'wink' },
    { icon: <FaMeh />, name: 'neutral' },
    { icon: <FaFrown />, name: 'sad' },
    { icon: <FaAngry />, name: 'angry' },
    { icon: <FaSurprise />, name: 'surprised' },
    { icon: <FaTired />, name: 'tired' },
  ];

  const answerContext = useContext(AnswerContext);

  const handleEmojiClick = (emojiIndex) => {
    answerContext[props.index] = emojiIndex;
    setSelectedEmoji(emojiIndex);
  };

  return (
    <div
      className="EmojiContainer"
      style={{ backgroundColor: props.bgColor || colors.white }}>
      {Object.entries(emojis).map(([index, { icon, name }]) => (
        <span
          key={index}
          className="emoji"
          style={{
            color: props.fgColor || colors.black,
            opacity: selectedEmoji && selectedEmoji !== index ? 0.5 : 1,
          }}
          onClick={() => handleEmojiClick(index)}>
          {icon}
        </span>
      ))}
    </div>
  );
};

export default EmojiFeedback;
