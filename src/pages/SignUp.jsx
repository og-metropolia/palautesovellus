import './sign-up.css';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ROUTES from '../constants/routes.mjs';
import { BASE_URL, ENDPOINTS } from '../constants/api.mjs';
import Copyright from '../components/Copyright';
import colors from '../constants/colors.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import { isValidEmail } from '../utils/input-validation.mjs';
import { useTranslation } from 'react-i18next';
import LangSelector from '../components/LanguageSelector.jsx';

const defaultTheme = createTheme();

export default function SignUp() {
  const [showError, setShowError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');

    if (!isValidEmail(email)) {
      setShowError(true);
      return;
    }

    fetch(`${BASE_URL}/${ENDPOINTS.users}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setShowError(false);
          window.localStorage.setItem(LOCAL_STORAGE_KEYS.userId, data.id);
          window.location.href = ROUTES.dashboard;
        } else if (data.code === 400) {
          setShowError(true);
        } else {
          setShowError(true);
        }
      })
      .catch((error) => {
        setShowError(true);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="background-video">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/assets/animatedBackground.mp4" type="video/mp4" />
          {t('_general.videoTagNotSupported')}
        </video>
      </div>
      <Container
        className="signup-container"
        component="main"
        maxWidth="xs"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: 'auto',
        }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: colors.gray,
            padding: '24px',
            borderRadius: '10px',
          }}>
          <img
            src="/assets/logo_512x512.png"
            alt={t('signup.logoAltText')}
            className="navbar-favicon"
            width={48}
          />

          <h1>{t('signup.signup')}</h1>
          {showError && (
            <span style={{ color: 'red', 'margin-bottom': '20px' }}>
              {t('_general.invalidInputError')}
            </span>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t('signup.firstName')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t('signup.lastName')}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('signup.email')}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t('signup.password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label={t('signup.getEmails')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}>
              {t('signup.signupButton')}
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to={ROUTES.login} variant="body2">
                  {t('signup.alreadyUser')}
                </Link>
              </Grid>
              <div className="lang-selector">
                <LangSelector />
              </div>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
