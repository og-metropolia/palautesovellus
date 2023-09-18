import './landing.css';
import PersonIcon from '@mui/icons-material/Person';
import Link from '@mui/material/Link';
import routes from '../constants/routes.mjs';

export default function Landing() {
  return (
    <div className="landing-page">
      <h1>Tervetuloa Palautepomppuun!</h1>

      <div className="etusivu-container">
        <div className="etusivu-content">
          <h2>Moderni palautejärjestelmä opetukseen</h2>
          <p>
            Palautepomppu tuo uuden ulottuvuuden opetuksen ja palautteen
            väliseen yhteyteen... [muu sisältö pysyy samana]
          </p>
        </div>

        <img
          className="frontpage-image"
          src="src/assets/drawingfeedback.jpg"
          alt="Luokkahuone, jossa lapset piirtävät palautettaan."
        />
      </div>

      <div className="etusivu-container">
        <div className="etusivu-content">
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

        <img
          className="frontpage-image"
          src="src/assets/drawfeedback.jpg"
          alt="Oppilas piirtää palautettaan."
        />
      </div>

      <div className="etusivu-container">
        <img
          className="frontpage-image"
          src="https://c1.staticflickr.com/5/4424/36362397355_62c51c217f_b.jpg"
          alt="Opettaja tarkastelee saamaansa palautetta tietokoneeltaan."
        />

        <div className="etusivu-content">
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
      </div>
    </div>
  );
}
