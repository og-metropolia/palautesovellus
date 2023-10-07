import './navbar.css';
import React from 'react';
import { Person as PersonIcon } from '@mui/icons-material';
import { Link, Button, Tooltip } from '@mui/material';
import ROUTES from '../constants/routes.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';

export default function Navbar() {
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
        <Tooltip title={userId ? 'Kirjaudu ulos' : 'Kirjaudu sisään'}>
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
      </div>
    </div>
  );
}
