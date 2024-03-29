import { db } from "./SQLite";

export function createTableUser() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "user " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, version TEXT, token TEXT, active INTEGER );"
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

export async function getUserActive() {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM user WHERE active = ? LIMIT 1;",
        [1],
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

export async function updateVersion(id, version) {
  db.transaction((transaction) => {
    transaction.executeSql(
      "UPDATE user SET version = ? WHERE id = ?",
      [version, id],
      (_, result) => {
        console.log("Version updated successfully!");
      },
      (_, error) => {
        console.error("Error updating version:", error);
      }
    );
  });
}

export async function logoff() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "UPDATE user SET active = ?",
      [0],
      (_, result) => {
        console.log("User logged off successfully!");
      },
      (_, error) => {
        console.error("Error logging off:", error);
      }
    );
  });
}

export async function loginActiveUser(name) {
  db.transaction((transaction) => {
    transaction.executeSql(
      "UPDATE user SET active = ? WHERE name = ?",
      [1, name],
      (_, result) => {
        console.log("User logged in successfully!");
      },
      (_, error) => {
        console.error("Error logging in:", error);
      }
    );
  });
}

export async function getUserByName(name) {
  console.log("AQUI");
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM user WHERE name = ?;",
        [name],
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
