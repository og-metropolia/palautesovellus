import './index.css';
import './reset.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Session from './pages/Session';
import SessionResults from './pages/SessionResults';
import ROUTES from './constants/routes.mjs';
import AdminDashboard from './pages/AdminDashboard';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={ROUTES.landing} component={Landing} />
          <Route path={ROUTES.signup} component={SignUp} />
          <Route path={ROUTES.login} component={SignIn} />
          <Route path={ROUTES.dashboard} component={Dashboard} />
          <Route path={ROUTES.admin} component={AdminDashboard} />
          <Route path={ROUTES.thanks} component={ThankYou} />
          <Route path="/session/:id" component={Session} />
          <Route path="/results/session/:id" component={SessionResults} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
