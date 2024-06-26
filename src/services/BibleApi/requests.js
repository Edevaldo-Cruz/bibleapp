import api from "./api";

export async function getChapter(version, abbrev, chapter) {
  try {
    version = version || "nvi";
    const result = await api.get(`verses/${version}/${abbrev}/${chapter}`);
    return result;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getChapterWithToken(version, abbrev, chapter, token) {
  try {
    version = version || "nvi";
    console.log(version);
    console.log(abbrev);
    console.log(chapter);
    console.log(token);
    const result = await api.get(`verses/${version}/${abbrev}/${chapter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function authenticateUser(email, password) {
  try {
    const result = await api.put(`users/token`, {
      email: email,
      password: password,
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Falha ao fazer login");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function newUser(name, email, password, notifications) {
  try {
    const result = await api.post(`users`, {
      name: name,
      email: email,
      password: password,
      notifications: notifications,
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Usuario criado com sucesso.");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function RecoverPasswordUser(email) {
  try {
    const encodedEmail = encodeURIComponent(email);
    const url = `users/password/${encodedEmail}`;

    const result = await api.post(url);
    if (result.status === 200) {
      console.log("Senha recuperada com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao recuperar a senha:", error.message);
    throw error;
  }
}
