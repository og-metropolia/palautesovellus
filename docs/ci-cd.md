# CI/CD
Tämä dokumentti kuvaa sovelluksen jatkuvaa integrointia ja jatkuvaa julkaisua varten toteutettuja ratkaisuja.

## Jenkins
Projektin jatkuva integrointi ja julkaisu on toteutettu Jenkinsin avulla. Palvelin on Metropolian palvelimella Docker -kontin sisällä. Työt ovat erillisiä, mutta jatkuva julkaisu -työ ajetaan jatkuvan integroinnin -työn jälkeen vain jos testit menevät läpi.

Jenkins palvelimen hallintapaneeli on saavutettavissa osoitteessa: http://10.120.33.63:8080.

## Jatkuva integrointi (CI)
0. Tarkistaa viiden minuutin välein onko GitHubin main-haaraan puskettu muutoksia. Jos on, niin työ ajetaan.
1. Hae uusin koodi GitHubista
2. Asenna riippuvuudet
3. Aja yksikkötestit
4. Luo testikattavuusraportti

## Jatkuva julkaisu (CD)
0. Ajetaan vain jos jatkuva integrointi -työ onnistui.
1. Hae uusin koodi GitHubista.
2. Asenna riippuvuudet.
3. Rakenna projekti.
4. Uudelleenkäynnistä palvelimet:
   * Web-tiedostoja tarjoava palvelin, saavutettavissa osoitteessa: http://10.120.33.52:80
   * REST-rajapintaa tarjoava palvelin, saavutettavissa osoitteessa: http://10.120.33.52:3000
