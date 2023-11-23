import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Luo uuden tietueen tietokantatauluun.
 *
 * @param {sqlite3.Database} db - SQLite-tietokantayhteys
 * @param {Object} response - HTTP-vastaus
 * @param {string} tableName - Tietokantataulun nimi
 * @param {string} fieldNames - Kenttien nimet, eroteltu pilkulla
 * @param {Array} fieldValues - Kenttien arvot
 */
export function insertRecord(db, response, tableName, fieldNames, fieldValues) {
  try {
    const placeholders = fieldValues.map(() => '?').join(', ');
    const sql = `INSERT INTO ${tableName} (${fieldNames}) VALUES (${placeholders})`;

    db.run(sql, fieldValues, function (err) {
      if (err) {
        console.log('Error while inserting a record into the database', err);
        response
          .status(400)
          .json({ code: 400, message: 'Record could not be created!' });
        return;
      }
      response.status(200).json({
        code: 200,
        message: 'Record created successfully!',
        id: this.lastID,
      });
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
}
// export function insertRecord(db, response, tableName, fieldNames, fieldValues) {
//   try {
//     const placeholders = Array.from(
//       { length: fieldValues.length },
//       () => '?',
//     ).join(', ');

//     db.run(
//       `INSERT INTO ${tableName} (${fieldNames}) VALUES (${placeholders})`,
//       fieldValues,
//       function (err) {
//         if (err) {
//           console.log('Error while inserting a record into the database', err);
//           response
//             .status(400)
//             .json({ code: 400, message: 'Record could not be created!' });
//           return null;
//         }
//         response.status(200).json({
//           code: 200,
//           message: 'Record created successfully!',
//           id: this.lastID,
//         });
//         return { id: this.lastID };
//       },
//     );
//   } catch (err) {
//     console.log(err);
//     response.status(500).json({ code: 500, message: 'Internal Server Error' });
//     return null;
//   }
// }

/**
 * Poistaa tietueen tietokantataulusta annetun id:n perusteella.
 *
 * @param {sqlite3.Database} db - SQLite-tietokantayhteys
 * @param {Object} response - HTTP-vastaus
 * @param {string} tableName - Tietokantataulun nimi
 * @param {number} id - Poistettavan tietueen id
 * @param {string} columnName - Vaihtoehtoinen kentän nimi, joka sisältää id:n
 */
export function deleteRecord(db, response, tableName, id, columnName = 'id') {
  try {
    db.run(
      `DELETE FROM ${tableName} WHERE ${columnName} = ?`,
      id,
      function (err) {
        if (err) {
          console.log('Error while deleting a record from the database', err);
          return response
            .status(400)
            .json({ code: 400, message: 'Record not found' });
        }
        return response
          .status(200)
          .json({ code: 200, message: 'Record deleted successfully!' });
      },
    );
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ code: 500, message: 'Internal Server Error' });
  }
}

/**
 * Hakee kaikki tietueet tietokantataulusta.
 *
 * @param {sqlite3.Database} db - SQLite-tietokantayhteys
 * @param {Object} response - HTTP-vastaus
 * @param {string} tableName - Tietokantataulun nimi
 */
export function queryRecordsAll(db, response, tableName) {
  try {
    db.all(`SELECT * FROM ${tableName}`, (err, results) => {
      if (err) {
        console.log(err);
        return response
          .status(400)
          .json({ code: 400, message: 'Records not found' });
      }
      response.status(200).json({
        code: 200,
        message: 'Records fetched successfully',
        results: results,
      });
    });
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ code: 500, message: 'Internal Server Error' });
  }
}

/**
 * Hakee tietueen tietokantataulusta annetun kentän arvon perusteella.
 *
 * @param {sqlite3.Database} db - SQLite-tietokantayhteys
 * @param {Object} response - HTTP-vastaus
 * @param {string} tableName - Tietokantataulun nimi
 * @param {string} fieldName - Kentän nimi
 * @param {*} fieldValue - Kentän arvo
 */
export function queryRecordByAttribute(
  db,
  response,
  tableName,
  fieldName,
  fieldValue,
) {
  db.get(
    `SELECT * FROM ${tableName} WHERE ${fieldName} = ?`,
    [fieldValue],
    (err, result) => {
      if (!result) {
        response.status(200).json({ message: 'Record not found' });
      }
      if (err) {
        console.log(err);
        return response
          .status(400)
          .json({ code: 400, message: 'Record not found' });
      }
      response.status(200).json(result);
    },
  );
}
