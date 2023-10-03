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
import routes from './constants/routes.mjs';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={routes.landing} component={Landing} />
          <Route path={routes.signup} component={SignUp} />
          <Route path={routes.login} component={SignIn} />
          <Route path={routes.dashboard} component={Dashboard} />
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
