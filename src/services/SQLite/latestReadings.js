import { db } from "./SQLite";

export function createTableLatestReadings() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "latestReadings " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, abbrev TEXT, chapter INTEGER, idUser INTEGER, inclusionDate DATETIME," +
        "FOREIGN KEY (idUser) REFERENCES user(id)" +
        ");"
    );
  });
}

export async function createLatestReadings(latestReadings) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO latestReadings (abbrev, chapter, idUser, inclusionDate) VALUES (?, ?, ?, ?);",
        [
          latestReadings.abbrev,
          latestReadings.chapter,
          latestReadings.idUser,
          latestReadings.inclusionDate,
        ],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve("Ok");
          } else {
            reject(new Error("Erro ao salvar informações de leitura."));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export async function getAllLatestReadings(userId) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM latestReadings WHERE idUser = ? ORDER BY id DESC LIMIT 15;",
        [userId],
        (_, result) => {
          if (result.rows && result.rows._array) {
            resolve(result.rows._array);
          } else {
            reject(new Error("Dados não encontrados."));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}
