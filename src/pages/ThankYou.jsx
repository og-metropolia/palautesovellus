import './thank-you.css';
import React from 'react';

export default function ThankYou() {
  return (
    <div className="thank-you-page-container">
      <div className="thanks-background-video">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/assets/ending.mp4" type="video/mp4" />
          Selaimesi ei tue videoita.
        </video>
      </div>
      <div className="content">
        <h1>Kiitos vastauksestasi!</h1>
      </div>
    </div>
  );
}
