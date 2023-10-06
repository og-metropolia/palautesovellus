import './navbar.css';
import React from 'react';
import { Person as PersonIcon } from '@mui/icons-material';
import { Link, Button } from '@mui/material';
import routes from '../constants/routes.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';

export default function Navbar() {
  const userId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  const handleButtonClick = () => {
    if (userId) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.userId);
      window.location.href = '/';
    } else {
      window.location.href = routes.login;
    }
  };

  return (
    <div className="navbar">
      <Link className="navbar-brand" href="/">
        <img
          src="/assets/logo_512x512.png"
          alt="Palautepomppu Logo"
          className="navbar-favicon"
          width={48}
        />
      </Link>
      <img src="/assets/pallot.gif" alt="Pallo kuva" className="pallo-gif" />
      <h1 className="navbar-heading">PALAUTEPOMPPU</h1>
      <div className="navbar-actions">
        <Button className="logout-button" onClick={handleButtonClick}>
          <PersonIcon
            className="icon-background"
            style={{ fontSize: '44px' }}
          />
          <p className="text-button">
            {userId ? 'Kirjaudu ulos' : 'Kirjaudu sisään'}
          </p>
        </Button>
      </div>
    </div>
  );
}
