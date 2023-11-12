import './index.css';
import './reset.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Session from './pages/Session';
import SessionResults from './pages/SessionResults';
import ROUTES from './constants/routes.mjs';
import AdminDashboard from './pages/AdminDashboard';
import ThankYou from './pages/ThankYou';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const [contentDirection, setContentDirection] = useState('ltr');

  useEffect(() => {
    setContentDirection(i18n.language !== 'ar' ? 'ltr' : 'rtl');
    const langSelectors = document.querySelectorAll('.lang-selector');
    for (const element of langSelectors) {
      if (element) {
        element.style.marginLeft = i18n.language !== 'ar' ? 'auto' : '0';
        element.style.marginRight = i18n.language !== 'ar' ? '0' : 'auto';
      }
    }
  }, []);

  i18n.on('languageChanged', () => {
    setContentDirection(i18n.language !== 'ar' ? 'ltr' : 'rtl');
    const langSelectors = document.querySelectorAll('.lang-selector');
    for (const element of langSelectors) {
      if (element) {
        element.style.marginLeft = i18n.language !== 'ar' ? 'auto' : '0';
        element.style.marginRight = i18n.language !== 'ar' ? '0' : 'auto';
      }
    }
  });

  return (
    <>
      <div dir={contentDirection ?? 'ltr'}>
        <Router>
          <Switch>
            <Route path={ROUTES.landing} component={Landing} />
            <Route path={ROUTES.signup} component={SignUp} />
            <Route path={ROUTES.login} component={SignIn} />
            <Route path={ROUTES.dashboard} component={Dashboard} />
            <Route path={ROUTES.admin} component={AdminDashboard} />
            <Route path={ROUTES.thanks} component={ThankYou} />
            <Route path={`${ROUTES.session}/:id`} component={Session} />
            <Route
              path={`${ROUTES.sessionResults}/:id`}
              component={SessionResults}
            />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
