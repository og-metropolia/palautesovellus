import './sessionlist.css';

export default function Sessionlist(props) {
  const sessions = props.data || [];

  if (!Array.isArray(sessions) || sessions.length === 0) {
    return (
      <div className="sessionlist-container">
        Ei kyselyjä saatavilla tai ladataan kyselyitä...
      </div>
    );
  }

  return (
    <div className="sessionlist-container">
      <h2>Aikaisemmat Kyselyt</h2>
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
  );
}
