import './emoji-feedback.css';
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
import AnswerContext from './AnswerContext.jsx';

export const emojis = [
  { icon: <FaLaugh />, name: 'smile' },
  { icon: <FaGrin />, name: 'wink' },
  { icon: <FaSurprise />, name: 'surprised' },
  { icon: <FaSmile />, name: 'happy' },
  { icon: <FaMeh />, name: 'neutral' },
  { icon: <FaFrown />, name: 'sad' },
  { icon: <FaAngry />, name: 'angry' },
  { icon: <FaTired />, name: 'tired' },
];

const EmojiFeedback = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const answerContext = useContext(AnswerContext);

  const handleEmojiClick = (emojiIndex) => {
    answerContext[props.index] = {
      question_id: props.question_id,
      content: emojis[emojiIndex].name,
    };
    setSelectedEmoji(emojiIndex);
  };

  return (
    <div
      className="emoji-container"
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
