import './sessionlist.css';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Sessionlist(props) {
  const { t } = useTranslation();
  const sessions = props.data || [];

  if (!Array.isArray(sessions) || sessions.length === 0) {
    return (
      <div className="session-wrapper">
        <div className="sessionlist-container" style={{ color: 'black' }}>
          {t('dashboard.loadingMessages.waitingSessions')}
          <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="session-wrapper">
      <div className="sessionlist-container">
        <h2>{t('dashboard.previousQuestionHeading')}</h2>
        <ul>
          {sessions.map((session, index) => (
            <li key={session.session_id}>
              <a href={`/results/session/${session.session_id}`}>
                {t('dashboard.sessionN').replace('{N}', ++index)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
