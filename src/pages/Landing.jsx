import './landing.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Landing() {
  return (
    <div className="landing-page">
      <Navbar />

      <div className="landing-container">
        <div className="landing-content">
          <h2>Moderni palautejärjestelmä opetukseen</h2>
          <p>
            Palautepomppu tuo uuden ulottuvuuden opetuksen ja palautteen
            väliseen yhteyteen, luoden innovatiivisen ja tehokkaan alustan sekä
            opettajille että opiskelijoille. Tämä järjestelmä virtaviivaistaa
            palauteprosessia, mahdollistaen opettajille helpon tavan kerätä,
            analysoida ja toimia saadun palautteen pohjalta. Palautepomppun
            kautta opettajat voivat parantaa opetusmenetelmiään, mukauttaa
            lähestymistapaansa vastaamaan opiskelijoiden tarpeita ja ennen
            kaikkea edistää koulutuskokemusten yleistä parantamista. Omaksu
            Palautepomppu ja astu opetuksen palautteen tulevaisuuteen.
          </p>
        </div>

        <img
          className="landing-image"
          src="/assets/student_drawing_on_tablet.jpg"
          alt="Lapsi antamassa palautetta."
        />
      </div>

      <div className="landing-container">
        <img
          className="landing-image"
          src="/assets/drawfeedback.jpg"
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
          src="/assets/person_analyzing.png"
          alt="Opettaja tarkastelee saamaansa palautetta."
        />
      </div>
      <Footer />
    </div>
  );
}
