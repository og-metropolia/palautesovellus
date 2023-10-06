# CI/CD
Tämä dokumentti kuvaa sovelluksen jatkuvaa integrointia ja jatkuvaa julkaisua varten toteutettuja ratkaisuja.

## Jenkins
Molemmat jatkuvan integroinnin ja jatkuvan julkaisun työt ovat toteutettu Jenkinsin avulla. Palvelin on Metropolian palvelimella Docker -kontin sisällä. Molemmat työt tarkistavat onko GitHubin main-haaraan puskettu muutoksia viiden minuutin välein. Jos on, niin työ ajetaan. Jenkins palvelimen hallintapaneeli on saavutettavissa osoitteessa: http://10.120.33.63:8080.

## Jatkuva integrointi (CI)
1. Hae uusin koodi GitHubista
2. Asenna riippuvuudet
3. Aja yksikkötestit
4. Luo testikattavuusraportti

## Jatkuva julkaisu (CD)
1. Hae uusin koodi GitHubista.
2. Asenna riippuvuudet.
3. Rakenna projekti.
4. Uudelleenkäynnistä palvelimet:
   * Web-tiedostoja tarjoava palvelin, saavutettavissa osoitteessa: http://10.120.33.52:80
   * REST-rajapintaa tarjoava palvelin, saavutettavissa osoitteessa: http://10.120.33.52:3000
