import './thank-you.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ThankYou() {
  const { t } = useTranslation();

  return (
    <div className="thank-you-page-container">
      <div className="thanks-background-video">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/assets/ending.mp4" type="video/mp4" />
          {t('_general.videoTagNotSupported')}
        </video>
      </div>
      <div className="content">
        <h1>{t('thankyou.thanksTitle')}</h1>
      </div>
    </div>
  );
}
