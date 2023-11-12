# Tietokannan Lokalisointi Suunnitelmadokumentti

## Johdanto
Tämä dokumentti kuvaa vaihtoehtoisia suunnitelmia tietokannan lokalisointiin.

## Käyttöliittymän tekstit tietokannassa

### Motivaatio
* Sisällön käännösten reaaliaikainen päivittyminen

### Toteutus
Jokaiselle kielelle olisi oma taulu joka sisältää käännökset. Taulun nimi olisi muotoa `i18n_<kieli>`, esim `i18n_en_US`. Taulun sisältö olisi muotoa: `(id, key, value)`. Taulun `id` olisi viittaus tauluun joka sisältää käännöksen avaimen. Taulun `key` olisi käännöksen avain, jota käytettäisi sovelluksessa oikean tekstin löytämiseksi. Taulun `value` olisi käännöksen teksti.

## Kielen merkitseminen käyttäjän syötteeseen

### Motivaatio
* Sisällön automaattinen kääntäminen muille kielille
* Sisällön suodatus käyttäjän kielivalinnan mukaan

### Toteutus
Käyttäjän syötteitä sisältäviin tauluihin tulisi uusi sarake `language`, joka sisältäisi käyttäjän valitseman kielen. Kentän arvo olisi muotoa `<kieli>_<maa>`, esim `en_US`. Kentän arvo tulisi käyttöliittymässä valitun kielen mukaan. Sisällön kielen merkitseminen mahdollistaisi automaattisen kääntämisen muille kielille esim. Google Translate API:n avulla. Sisällön suodatus käyttäjän kielivalinnan mukaan olisi mahdollista käyttöliitymässä olevan kielivalinnan avulla.
