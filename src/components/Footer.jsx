import './footer.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-container">
          <img
            src="/assets/logo_512x512.png"
            alt={t('footer.altText')}
            className="footer-logo"
          />
        </div>
        <div className="footer-col-1">
          <h4>{t('footer.contact.title')}</h4>
          <p>
            <a href=" mailto: info@palautepomppu.fi">
              {t('footer.contact.email')}
            </a>
          </p>
          <p>
            <a href=" tel: +358401234567">{t('footer.contact.phone')}</a>
          </p>
        </div>
        <div className="footer-col-2">
          <h4>{t('footer.links.title')}</h4>
          <p>
            <a href="https://tietosuoja.fi/henkilotietojen-kasittely">
              {t('footer.links.terms')}
            </a>
          </p>
          <p>
            <a href="https://europa.eu/youreurope/business/dealing-with-customers/data-protection/data-protection-gdpr/index_fi.htm">
              {t('footer.links.dataProtection')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
