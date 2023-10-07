import './emoji-rating.css';
import React, { useState } from 'react';
import { emojis } from './EmojiFeedback.jsx';

export default function EmojiRating(props) {
  const getStat = (idx) => stats[idx] || 0;

  const getMaxStat = () => {
    let max = 0;
    for (let i = 0; i < stats.length; i++) {
      if (stats[i] > max) {
        max = stats[i];
      }
    }
    return max;
  };

  const stats = props.stats;
  const maxStat = Math.max(getMaxStat(stats));
  const maxSize = 100;

  return (
    <div className="emoji-stats">
      <div className="emoji-stats">
        {emojis.map((emoji, idx) => {
          return (
            <div className="emoji-stat-container" key={idx}>
              {emoji.icon} <p>{getStat(idx)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
