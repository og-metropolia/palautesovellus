import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

export default function Landing() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const currentLanguage = i18n.language.split('-')[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: '#f0f0f0' }}
        aria-haspopup="true"
        onClick={handleClick}>
        <LanguageIcon style={{ marginRight: 5 }} />
        {currentLanguage.toUpperCase()}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage('fi')}>Finnish</MenuItem>
        <MenuItem onClick={() => changeLanguage('ar')}>Arabic</MenuItem>
      </Menu>
    </div>
  );
  console.log(i18n.language);
}
