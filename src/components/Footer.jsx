import './footer.css';
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-container">
          <img
            src="/assets/logo_512x512.png"
            alt="Palautepomppu Logo"
            className="footer-logo"
          />
        </div>
        <div className="footer-col-1">
          <h4>Yhteystiedot</h4>

          <p>
            <a href=" mailto: info@palautepomppu.fi">info@palautepomppu.fi</a>
          </p>
          <p>
            <a href=" tel: +358401234567">+358 40 123 4567</a>
          </p>
        </div>
        <div className="footer-col-2">
          <h4>Linkit</h4>
          <p>
            <a href="https://tietosuoja.fi/henkilotietojen-kasittely">
              Käyttöehdot
            </a>
          </p>
          <p>
            <a href="https://europa.eu/youreurope/business/dealing-with-customers/data-protection/data-protection-gdpr/index_fi.htm">
              Tietosuoja
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
