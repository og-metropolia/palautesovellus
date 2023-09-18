import './landing.css';
import { Person as PersonIcon } from '@mui/icons-material';
import { Link } from '@mui/material';
import routes from '../constants/routes.mjs';
import Footer from '../components/Footer.jsx';

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Yläpalkki */}
      <div className="navbar">
        <Link className="navbar-brand" href="/">
          <img
            src="src/assets/logo_512x512.png"
            alt="Palautepomppu Logo"
            className="navbar-favicon"
            width={48}
          />
        </Link>
        <div className="navbar-actions">
          <Link className="navbar-login-btn" href={routes.login}>
            <PersonIcon style={{ fontSize: '44px' }} />
          </Link>
        </div>
      </div>
      <h1>Palautepomppu</h1>

      <div className="landing-container">
        <div className="landing-content">
          <h2>Moderni palautejärjestelmä opetukseen</h2>
          <p>
            Palautepomppu tuo uuden ulottuvuuden opetuksen ja palautteen
            väliseen yhteyteen... [muu sisältö pysyy samana]
          </p>
        </div>

        <img
          className="landing-image"
          src="src/assets/student_drawing_on_tablet.jpg"
          alt="Lapsi antamassa palautetta."
        />
      </div>

      <div className="landing-container">
        <img
          className="landing-image"
          src="src/assets/drawfeedback.jpg"
          alt="Oppilas piirtää palautettaan."
        />
        <div className="landing-content">
          <h2>Piirrä palaute</h2>
          <p>
            Palautepomppu mahdollistaa palautteen antamisen myös piirrosten
            muodossa. Visuaalinen palaute on voimakas työkalu, joka voi auttaa
            ymmärtämään oppilaiden tuntemuksia ja ajatuksia syvemmin kuin
            perinteiset tekstit.
          </p>
          <p>
            Piirtämällä oppilaat voivat ilmaista tunteitaan, ajatuksiaan ja
            käsityksiään opetuksen sisällöstä ja menetelmistä. Se antaa heille
            mahdollisuuden kommunikoida eri tavalla ja tuoda esille näkökulmia,
            jotka saattavat jäädä tekstipohjaisessa palautteessa huomaamatta.
          </p>
        </div>
      </div>

      <div className="landing-container">
        <div className="landing-content">
          <h2>Tulosten analysointi ja toiminnan parantaminen</h2>
          <p>
            Saatu palaute on arvokasta vain, jos sen pohjalta voidaan tehdä
            toimenpiteitä. Palautepomppu antaa opettajille selkeän katsauksen
            saatuun palautteeseen visuaalisten kaavioiden ja analyysityökalujen
            avulla.
          </p>
          <p>
            Olipa kyse yksittäisen oppitunnin palautteesta tai pitkän aikavälin
            trendeistä, Palautepomppu tarjoaa ratkaisut tiedon keräämiseen ja
            analysointiin.
          </p>
          <p>
            Anna Palautepomppun auttaa sinua tehostamaan opetustasi ja
            tarjoamaan oppilaillesi parhaan mahdollisen oppimiskokemuksen.
          </p>
        </div>
        <img
          className="landing-image"
          src="src/assets/person_analyzing.png"
          alt="Opettaja tarkastelee saamaansa palautetta."
        />
      </div>
      <Footer />
    </div>
  );
}
