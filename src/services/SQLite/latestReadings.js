import { db } from "./SQLite";

export function createTableLatestReadings() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "latestReadings " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, book TEXT, abbrev TEXT, chapter INTEGER, idUser INTEGER, inclusionDate DATETIME," +
        "FOREIGN KEY (idUser) REFERENCES user(id)" +
        ");"
    );
  });
}

export async function createLatestReadings(latestReadings) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM latestReadings WHERE id != (SELECT id FROM latestReadings ORDER BY inclusionDate DESC LIMIT 1) ORDER BY inclusionDate DESC LIMIT 1;",
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            const lastSavedItem = result.rows.item(0);
            if (
              lastSavedItem.abbrev === latestReadings.abbrev &&
              lastSavedItem.chapter === latestReadings.chapter &&
              lastSavedItem.idUser === latestReadings.idUser
            ) {
              resolve("Não salvo: O último item é igual ao item atual.");
              console.log("Cai aqui if do if");
            } else {
              transaction.executeSql(
                "INSERT INTO latestReadings (book, abbrev, chapter, idUser, inclusionDate) VALUES (?, ?, ?, ?, ?);",
                [
                  latestReadings.book,
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
                  console.log("Cai aqui else do if");
                },
                (_, error) => {
                  reject(error);
                }
              );
            }
          } else {
            transaction.executeSql(
              "INSERT INTO latestReadings (book, abbrev, chapter, idUser, inclusionDate) VALUES (?, ?, ?, ?, ?);",
              [
                latestReadings.book,
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
