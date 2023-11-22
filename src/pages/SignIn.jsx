import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ROUTES from '../constants/routes.mjs';
import { BASE_URL } from '../constants/api.mjs';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Copyright from '../components/Copyright';
import colors from '../constants/colors.mjs';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import { isValidEmail } from '../utils/input-validation.mjs';
import LangSelector from '../components/LanguageSelector.jsx';
import { useTranslation } from 'react-i18next';

const defaultTheme = createTheme();

export default function SignIn() {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    if (!isValidEmail(email)) {
      setShowError(true);
      return;
    }

    const is_admin = new URLSearchParams(window.location.search).get('admin');

    fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        is_admin: is_admin ? true : false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.successful) {
          setShowError(false);
          if (is_admin) {
            window.localStorage.setItem(
              LOCAL_STORAGE_KEYS.adminId,
              data.user_id,
            );
            window.location.href = ROUTES.admin;
          } else {
            window.localStorage.setItem(
              LOCAL_STORAGE_KEYS.userId,
              data.user_id,
            );
            window.location.href = ROUTES.dashboard;
          }
        } else if (data.code === 400) {
          setShowError(true);
        } else {
          setShowError(true);
        }
      })
      .catch((e) => {
        setShowError(true);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?children_learning)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ backgroundColor: colors.gray }}
          square>
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <img
              src="/assets/logo_512x512.png"
              alt={t('login.logo')}
              className="navbar-favicon"
              width={56}
            />
            <h1>{t('login.login')}</h1>
            {showError && (
              <span style={{ color: 'red' }}>{t('login.cantFindAcc')}</span>
            )}

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('login.email')}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('login.password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={t('login.rememberMe')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}>
                {t('login.login')}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to={ROUTES.signup}
                    variant="body2">
                    {t('login.noAccount')}
                  </Link>
                </Grid>
                <div className="lang-selector">
                  <LangSelector />
                </div>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
