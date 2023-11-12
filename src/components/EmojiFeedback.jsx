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
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const emojis = [
  { icon: <FaLaugh />, name: 'smile', tooltipName: 'session.emoji.smile' },
  { icon: <FaGrin />, name: 'wink', tooltipName: 'session.emoji.wink' },
  {
    icon: <FaSurprise />,
    name: 'surprised',
    tooltipName: 'session.emoji.surprised',
  },
  { icon: <FaSmile />, name: 'happy', tooltipName: 'session.emoji.happy' },
  { icon: <FaMeh />, name: 'neutral', tooltipName: 'session.emoji.neutral' },
  { icon: <FaFrown />, name: 'sad', tooltipName: 'session.emoji.sad' },
  { icon: <FaAngry />, name: 'angry', tooltipName: 'session.emoji.angry' },
  { icon: <FaTired />, name: 'tired', tooltipName: 'session.emoji.tired' },
];

export default function EmojiFeedback(props) {
  const { t } = useTranslation();
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
      {emojis.map((emoji, index) => (
        <Tooltip key={index} title={t(emoji.tooltipName)} arrow>
          <span
            className="emoji"
            style={{
              color: props.fgColor || colors.black,
              opacity:
                selectedEmoji !== null && selectedEmoji !== index ? 0.5 : 1,
            }}
            onClick={() => handleEmojiClick(index)}>
            {emoji.icon}
          </span>
        </Tooltip>
      ))}
    </div>
  );
}
