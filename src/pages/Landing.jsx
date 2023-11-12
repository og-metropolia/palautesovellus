import './landing.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { t } = useTranslation();

  return (
    <div className="landing-page">
      <Navbar showLoginButton={true} />

      <div className="landing-container">
        <div className="landing-content">
          <h2>{t('landing.feedbackSystem.title')}</h2>
          <p>{t('landing.feedbackSystem.content')}</p>
        </div>

        <img
          className="landing-image"
          src="/assets/student_drawing_on_tablet.jpg"
          alt={t('landing.feedbackSystem.imageAltText')}
        />
      </div>

      <div className="landing-container">
        <img
          className="landing-image"
          src="/assets/drawfeedback.jpg"
          alt={t('landing.draw.imageAltText')}
        />
        <div className="landing-content">
          <h2>{t('landing.draw.title')}</h2>
          <p>{t('landing.draw.content')}</p>
        </div>
      </div>

      <div className="landing-container">
        <div className="landing-content">
          <h2>{t('landing.analyzing.title')}</h2>
          <p>{t('landing.analyzing.content')}</p>
        </div>
        <img
          className="landing-image"
          src="/assets/person_analyzing.png"
          alt={t('landing.analyzing.imageAltText')}
        />
      </div>
      <Footer />
    </div>
  );
}
