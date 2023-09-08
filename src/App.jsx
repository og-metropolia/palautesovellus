import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Etusivu from './pages/Etusivu';
import routes from "./constants/routes.mjs";

function App() {
  return (
    <Router>
        <Route path={routes.landing} component={Etusivu} />
        <Route path={routes.signup} component={SignUp} />
        <Route path={routes.login} component={SignIn} />
    </Router>
  );
}

export default App;
