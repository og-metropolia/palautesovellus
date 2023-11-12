import './navbar.css';
import React from 'react';
import { Person as PersonIcon } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import ROUTES from '../constants/routes.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import LangSelector from '../components/LanguageSelector.jsx';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();
  const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  const handleButtonClick = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.adminId);
    if (userId) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.userId);
      window.location.href = '/';
    } else {
      window.location.href = ROUTES.login;
    }
  };

  return (
    <div className="navbar">
      <Button
        className="navbar-brand"
        onClick={() => (window.location.href = ROUTES.dashboard)}>
        <img
          src="/assets/logo_512x512.png"
          alt={t('navbar.logoAltText')}
          className="navbar-favicon"
          width={48}
        />
      </Button>
      <img
        src="/assets/pallot.gif"
        alt={t('navbar.ballAltText')}
        className="ball-gif"
      />
      <Button onClick={() => (window.location.href = '/')}>
        <h1 className="navbar-heading">{t('navbar.mainTitle')}</h1>
      </Button>
      <div className="navbar-actions">
        <Tooltip title={userId ? t('navbar.logout') : t('navbar.login')}>
          <Button className="logout-button" onClick={handleButtonClick}>
            <PersonIcon
              className="icon-background"
              style={{
                fontSize: '44px',
                color: userId ? 'var(--p-blue)' : 'grey',
              }}
            />
          </Button>
        </Tooltip>
        <LangSelector />
      </div>
    </div>
  );
}
