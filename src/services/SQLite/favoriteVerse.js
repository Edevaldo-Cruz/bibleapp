import { db } from "./SQLite";

export function createTableFavoriteVerse() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "favoriteVerse " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, idUser INTEGER, verse TEXT, annotation TEXT, book TEXT, abbrev TEXT, chapter INTEGER, inclusionDate DATETIME," +
        "FOREIGN KEY (idUser) REFERENCES user(id)" +
        ");"
    );
  });
}

export function saveFavoriteVerse(verseData) {
  db.transaction((transaction) => {
    const {
      idUser,
      verse,
      annotation,
      book,
      abbrev,
      chapter,
      inclusionDate = new Date().toISOString(),
    } = verseData;

    transaction.executeSql(
      "INSERT INTO favoriteVerse (idUser, verse, annotation, book, abbrev, chapter, inclusionDate) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [idUser, verse, annotation, book, abbrev, chapter, inclusionDate],
      (_, result) => {
        console.log("Verse saved successfully!");
      },
      (_, error) => {
        console.error("Error saving verse:", error);
      }
    );
  });
}

export function getAllFavoriteVerses() {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM favoriteVerse",
        [],
        (_, result) => {
          const rows = result.rows;
          const favoriteVerses = [];

          for (let i = 0; i < rows.length; i++) {
            const verse = rows.item(i);
            favoriteVerses.push(verse);
          }

          resolve(favoriteVerses);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}
