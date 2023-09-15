import './etusivu.css';
import PersonIcon from '@mui/icons-material/Person';
import Link from '@mui/material/Link';
import routes from '../constants/routes.mjs';

export default function Etusivu() {
  return (
    <div className="etusivu-container">

    {/* Teacher Login */}
    <div className="teacher-login">
      <Link href={routes.login} underline="none" color="inherit">
          <PersonIcon/>
      </Link>
    </div>

    <h1>Palautepomppu!</h1>
    <p>Kerro, piirrä tai puhu – Palautepomppu yhdistää luokan</p>

    {/* Features */}
    <div className="features">

      {/* Feature 1 */}
      <div className="feature">
        {/* <img src="" alt="Feature 1" /> */}
        <p>Arvioi tuntisi hauskoin hymiöin!</p>
      </div>

      {/* Feature 2 */}
      <div className="feature">
        {/* <img src="" alt="Feature 2" /> */}
        <p>Kerro meille superretkestäsi!</p>
      </div>

      {/* Feature 3 */}
      <div className="feature">
        {/* <img src="" alt="Feature 3" /> */}
        <p>Opettajasi näkee palautteesi heti</p>
      </div>

    </div>
  </div>
  );
}
