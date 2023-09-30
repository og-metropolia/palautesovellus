# Projektisuunnitelma - Palautepomppu

- [Tavoitteet](#tavoitteet)
- [Sovelluksen laajuusmäärittely](#sovelluksen-laajuusmäärittely)
  - [Toiminnalliset vaatimukset](#toiminnalliset-vaatimukset)
  - [Ei-toiminnalliset vaatimukset](#ei-toiminnalliset-vaatimukset)
  - [Toteutuksen ulkopuolelle jäävät ominaisuudet](#toteutuksen-ulkopuolelle-jäävät-ominaisuudet)
- [Resurssien allokaatio](#resurssien-allokaatio)
  - [Riskien arviointi](#riskien-arviointi)
  - [Tiimi](#tiimi)
  - [Teknologiat](#teknologiat)
    - [Käyttöliittymä](#käyttöliittymä)
    - [REST rajapinta](#rest-rajapinta)
    - [Tietokanta](#tietokanta)
    - [Testaus](#testaus)
    - [Muut työkalut](#muut-työkalut)
  - [Kommunikointi](#kommunikointi)
  - [Budjetointi ja kustannusarvio](#budjetointi-ja-kustannusarvio)
- [Laki ja vaatimuksenmukaisuus](#laki-ja-vaatimuksenmukaisuus)

## Tavoitteet
- Verkkosovellus, jossa alakoululaisille miellyttävä käyttöliittymä.
- Alakoululaisille miellyttävä tapa antaa palautetta.
- Opettajalle helppo tapa saada palautetta oppituokioista ja mahdollisista koulun järjestämistä ohjelmista kuten retkistä.
- Opettajalle helpompi tapa analysoida palautetta esimerkiksi paperilomakkeisiin verrattuna.

## Sovelluksen laajuusmäärittely

### Toiminnalliset vaatimukset

1. Turvallinen kirjautuminen:
    - Oppilaille generoidaan uniikki koodi, jolla he voivat osallistua kyselyyn.
    - Opettajilla on erillinen hallinnointipaneeli, johon he voivat kirjautua.

2. Monimuoitoisen palautteen antaminen:
    - Mahdollisuus antaa palautetta eri muodoissa: teksti, piirrokset tai emojit.
    - Kullekin palautetyypille on oma kenttänsä: piirtämiskenttä, kirjoituskenttä ja emojikenttä.

3. Kyselyt ja palaute:
    - Opettajat voivat luoda kyselyitä ja saada palautetta eri muodoissa.
    - Analytiikkatyökalut palautteiden analysointiin.
    - Palautteen tulostaminen.

### Ei-toiminnalliset vaatimukset

1. Käyttöliittymä:
     - Käyttöliittymän tulee olla helppokäyttöinen ja miellyttävä alakoululaisille.
     - Käyttöliittymän tulee olla responsiivinen.

2. Yhteensopivuus ja saatavuus:
     - Web-pohjaisena sovelluksena, se on saatavilla kaikille laitteille, jotka tukevat moderneja
     verkkoselaimia.
     - Ei erityistä laite- tai käyttöjärjestelmävaatimuksia, mitkä mahdollistaa laajan käyttöönoton eri laitteilla.

3. Tietoturva:
     - Tietokantaan tallennettavat salasanat tulee salata (engl. encrypt).
     - Vanhemmilla tai muilla ulkopuolisilla ei tule olla pääsyä kyselyihin tai palautteisiin.

4. Dokumentaatio:
     - REST API tulee olla kattavasti dokumentoitu.
     - Tietokantarakenne tulee olla dokumentoitu ja selkeä.
     - Kaiken dokumentaation tulee olla helposti saatavilla projektin GitHub-repositoriossa.

### Toteutuksen ulkopuolelle jäävät ominaisuudet
- Kyselyiden muokkaaminen jälkikäteen.
- Kyselyiden poistaminen.
- Kyselytulosten visualisointi.
- Kyselyjen jakaminen muiden opettajien tai koulun muun henkilökunnan kanssa.
- Ääniviestipalautteen antaminen.
- Tekstistä puheeksi -kyselyt.

## Resurssien allokaatio

### Riskien arviointi

1. Tekniset riskit:
    - Infrastuktuuriongelmat, kuten Metropolian tiedonhallintapalveluiden toimintakatkot
    - Tietoturvariskit
    - Yhteensopivuusongelmat
    - Ohjelmistobugit

2. Projektihallinnalliset riskit:
    - Aikataulun ylitys
    - Budjetin ylitys
    - Kommunikointiongelmat
    - Yksittäisen tiimiläisen työpanoksen puute
    - Muuttuvat vaatimukset

3. Käyttäjäkuntariskit:
    - Käyttäjien vastaanottokyvyn riskit
    - Koulutus ja tuki

### Tiimi

Scrum tiimimme koostuu 5 jäsenestä.

- Tuotteenomistaja (engl. product owner)
- 4 kehittäjää, joista yksi toimii scrum masterina per sprintti

### Teknologiat

#### Käyttöliittymä

Käytämme [React](https://react.dev/) -kehystä käyttöliittymän luomiseen [Vite](https://vitejs.dev/) -kehitysympäristössä.

#### REST rajapinta

Tulemme käyttämään [Express](https://expressjs.com/) -kehystä API-pyyntöjen käsittelyyn ja [Node](https://nodejs.org/en) -ympäristöä ajonaikana.

#### Tietokanta

Tulemme käyttämään [Metropolian MySQL-palvelinta](https://wiki.metropolia.fi/display/itservices/Home+Page%2C+Shell+and+MySQL+Services#:~:text=of%20the%20files.-,MySQL%2Dservice,-All%20Metropolia%20users) tietokannan hostaukseen. Tietokantaan yhdistämiseen käytämme [`mysql`](https://www.npmjs.com/package/mysql) npm-pakettia. Tietokantaan yhdistäminen vaatii [VPN-yhteyden Metropolian verkkoon](https://tietohallinto.metropolia.fi/display/itservices/VPN+Remote+Connections).

#### Testaus

Aiomme käyttää [Vitest](https://vitest.dev/) -kehystä yksikkötestien ajamiseen. Testit tullaan ajamaan Jenkinsissä Metropolian palvelimella.

#### Muut työkalut

Käytämme muita npm-paketteja kehityksen avuksi. Täydellinen lista paketeista löytyy [`package.json`](../package.json) -tiedostosta.

Käytämme [Git](https://git-scm.com/) -versionhallintaa ja [GitHub](https://github.com/) -palvelua koodin hostaukseen.

### Kommunikointi

1. [Discord](https://discord.com/):
Käytämme Discord-palvelua päivittäiseen viestintään tiimin sisällä. Tämä mahdollistaa reaaliaikaisen keskustelun, tiedostojen jakamisen ja ongelmanratkaisun. Discord on myös alustamme viikoittaisille Sprint Meetingeille.

2. [Trello](https://trello.com/):
Projektin hallinnointiin ja tehtävien seurantaan käytämme Trello-palvelua. Trello antaa meille visuaalisen yleiskuvan projektin etenemisestä, tehtävistä ja vastuista.

3. Sprint Review Meeting:
Järjestämme viikoittain Sprint Review -kokouksen koulussa fyysisesti, johon osallistuvat kaikki neljä tiimin jäsentä sekä opettajamme, joka toimii product ownerina. Tämä kokous auttaa meitä arvioimaan viikon edistystä, tunnistamaan mahdolliset esteet ja suunnittelemaan seuraavia askeleita. Se on myös tilaisuus saada palautetta ja ohjausta opettajaltamme.

4. Sprint Meeting:
Meillä on Sprint Meeting Discordissa, joka järjestetään noin 3-4 kertaa viikossa. Tähän osallistuvat kaikki neljä tiimimme kehittäjää. Tämä on tärkeä hetki tarkastella viikon suunnitelmia, tehtävien jakoja ja keskustella projektin teknisistä yksityiskohdista.

5. Sprint Planning:
Sprint Planning -kokous pidetään alkavan sprintin alussa. Tässä kokouksessa suunnittelemme tulevan sprintin tehtävät, arvioimme työmäärät ja jaamme vastuut tiimin kesken. Tämä on myös tilaisuus tarkastella ja päivittää backlogia, jossa kaikki projektiin liittyvät tehtävät on listattu.

### Budjetointi ja kustannusarvio

Koska kyseessä on kouluprojekti, emme kohtaa perinteisiä kustannuksia, kuten palkkoja tai ohjelmistolisenssejä. Kuitenkin on tärkeää ymmärtää mahdolliset resurssien käytöt ja niiden vaikutukset projektiin:

1. Työtunnit:
4 jäsentä työskentelee 8 viikon ajan.
Oletetaan, että jokainen jäsen työskentelee keskimäärin 12 tuntia viikossa (ilman palkkaa, koska kyseessä on kouluprojekti).
Yhteensä: 4 jäsentä x 12 tuntia x 8 viikkoa = 384 työtuntia

2. Ohjelmistot ja työkalut:
Vaikka monia ohjelmistoja ja palveluita saadaan ilmaiseksi tai koulun tarjoamina, voisi olla mahdollisia kuluja, jos tiimi päättää käyttää erikoistyökaluja tai -palveluita. Arvioidaan nämä kulut: 0€ (olettaen, että kaikki tarvittavat työkalut ovat ilmaisia tai koulun tarjoamia).

3. Muut resurssit:
Vaikka moni resurssi on maksuton, voi olla hyödyllistä laskea esimerkiksi tarvittava palvelintila tai muut virtuaaliset resurssit. Nämä eivät ehkä tule todellisina kustannuksina, mutta ovat silti osa projektin resurssien kulutusta.

4. Yhteenveto:
Kouluprojektimme suurin "kustannus" on tiimin jäsenten käyttämä aika. Vaikka emme kohtaa varsinaisia taloudellisia kuluja, on tärkeää arvostaa ja hallinnoida aikaamme, jotta projekti saadaan valmiiksi suunnitellussa aikataulussa.


## Laki ja vaatimuksenmukaisuus

Tuotteenomistajan (engl. product owner) pyynnöstä emme tallenna yksilöityä dataa oppilaista.
