import './emoji-rating.css';
import React, { useState } from 'react';
import { emojis } from './EmojiFeedback.jsx';

export default function EmojiRating(props) {
  const getStat = (idx) => stats[idx] || 0;

  const stats = props.stats;
  return (
    <div className="emoji-stats">
      <div className="emoji-stat-container" key={0}>
        {emojis[0].icon} <p>{getStat(0)}</p>
      </div>
      <div className="emoji-stat-container" key={1}>
        {emojis[1].icon} <p>{getStat(1)}</p>
      </div>
      <div className="emoji-stat-container" key={2}>
        {emojis[2].icon} <p>{getStat(2)}</p>
      </div>
      <div className="emoji-stat-container" key={3}>
        {emojis[3].icon} <p>{getStat(3)}</p>
      </div>
      <div className="emoji-stat-container" key={4}>
        {emojis[4].icon} <p>{getStat(4)}</p>
      </div>
      <div className="emoji-stat-container" key={5}>
        {emojis[5].icon} <p>{getStat(5)}</p>
      </div>
      <div className="emoji-stat-container" key={6}>
        {emojis[6].icon} <p>{getStat(6)}</p>
      </div>
      <div className="emoji-stat-container" key={7}>
        {emojis[7].icon} <p>{getStat(7)}</p>
      </div>
    </div>
  );
}
