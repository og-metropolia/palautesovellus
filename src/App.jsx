import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Etusivu from './pages/Etusivu';

function App() {
  return (
    <Router>
        <Route path="//" component={Etusivu} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={SignIn} />
    </Router>
  );
}

export default App;
