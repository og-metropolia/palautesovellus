/**
 * @fileoverview
 * Tämä moduuli sisältää neljä funktiota tietokannan käsittelyyn.
 * insertRecord, deleteRecord, queryRecordsAll ja queryRecordByAttribute
 * ovat yleiskäyttöisiä funktioita, jotka voidaan soveltaa eri tietokantataulujen kanssa.
 */

/**
 * Luo uuden tietueen tietokantatauluun.
 *
 * @param {Object} conn - Tietokantayhteys
 * @param {Object} response - HTTP-vastaus
 * @param {string} tableName - Tietokantataulun nimi
 * @param {string} fieldNames - Kenttien nimet, eroteltu pilkulla
 * @param {Array} fieldValues - Kenttien arvot
 */
export function insertRecord(
  conn,
  response,
  tableName,
  fieldNames,
  fieldValues
) {
  try {
    const placeholders = Array.from(
      { length: fieldValues.length },
      () => '?'
    ).join(', ');
    conn.query(
      `INSERT INTO ${tableName} (${fieldNames}) VALUES (${placeholders})`,
      fieldValues,
      (err) => {
        if (err) {
          console.log('Error while inserting a record into the database', err);
          return response.status(400).send();
        }
        return response
          .status(200)
          .json({ message: 'Record created successfully!' });
      }
    );
  } catch (err) {
    console.log(err);
    return response.status(500).send();
  }
}

/**
 * Poistaa tietueen tietokantataulusta annetun id:n perusteella.
 *
 * @param {Object} conn - Tietokantayhteys
 * @param {Object} response - HTTP-vastaus
 * @param {string} tableName - Tietokantataulun nimi
 * @param {number} id - Poistettavan tietueen id
 */
export function deleteRecord(conn, response, tableName, id) {
  try {
    conn.query(`DELETE FROM ${tableName} WHERE id = ?`, id, (err) => {
      if (err) {
        console.log('Error while deleting a record from the database', err);
        return response.status(400).send();
      }
      return response
        .status(200)
        .json({ message: 'Record deleted successfully!' });
    });
  } catch (err) {
    console.log(err);
    return response.status(500).send();
  }
}

/**
 * Hakee kaikki tietueet tietokantataulusta.
 *
 * @param {Object} conn - Tietokantayhteys
 * @param {Object} response - HTTP-vastaus
 * @param {string} tableName - Tietokantataulun nimi
 */
export function queryRecordsAll(conn, response, tableName) {
  try {
    conn.query(`SELECT * FROM ${tableName}`, (err, results) => {
      if (err) {
        console.log(err);
        return response.status(400).send();
      }
      response.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return response.status(500).send();
  }
}

/**
 * Hakee tietueen tietokantataulusta annetun kentän arvon perusteella.
 *
 * @param {Object} conn - Tietokantayhteys
 * @param {Object} response - HTTP-vastaus
 * @param {string} tableName - Tietokantataulun nimi
 * @param {string} fieldName - Kentän nimi
 * @param {*} fieldValue - Kentän arvo
 */
export function queryRecordByAttribute(
  conn,
  response,
  tableName,
  fieldName,
  fieldValue
) {
  conn.query(
    `SELECT * FROM ${tableName} WHERE ${fieldName} = ?`,
    [fieldValue],
    (err, results) => {
      if (results.length === 0) {
        response.status(200).json({ message: 'Record not found' });
      }
      if (err) {
        console.log(err);
        return response.status(400).send();
      }
      response.status(200).json(results[0]);
    }
  );
}

