import { db } from "./SQLite";

export function createTableUser() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "user " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, token TEXT);"
    );
  });
}

export async function savesUserInformation(user) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO user (name, email, token) VALUES (?, ?, ?);",
        [user.name, user.email, user.token],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve("Ok");
          } else {
            reject(new Error("Erro ao salvar informações do usuário."));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export async function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM user;",
        [],
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

export async function getUser() {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM user ORDER BY id DESC LIMIT 1;",
        [],
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
