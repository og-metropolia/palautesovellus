import './sessionlist.css';
import { CircularProgress } from '@mui/material';

export default function Sessionlist(props) {
  const sessions = props.data || [];

  if (!Array.isArray(sessions) || sessions.length === 0) {
    return (
      <div className="session-wrapper">
        <div className="sessionlist-container" style={{ color: 'black' }}>
          Ei kyselyjä saatavilla tai ladataan kyselyitä...
          <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="session-wrapper">
      <div className="sessionlist-container">
        <h2>Aikaisemmat kyselyt</h2>
        <ul>
          {sessions.map((session, index) => (
            <li key={session.session_id}>
              <a href={`/results/session/${session.session_id}`}>
                Kysely {++index}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
