import './index.css';
import './reset.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Feedback from './pages/Feedback';
import routes from './constants/routes.mjs';

function App() {
  return (
    <>
      <Router>
        <Route path={routes.landing} component={Landing} />
        <Route path={routes.signup} component={SignUp} />
        <Route path={routes.login} component={SignIn} />
        <Route path={routes.dashboard} component={Dashboard} />
        <Route path={routes.feedback} component={Feedback} />
      </Router>
    </>
  );
}

export default App;
