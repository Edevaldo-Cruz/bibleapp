import api from "./api";

export async function getChapter(version, abbrev, chapter) {
  try {
    const result = await api.get(`verses/${version}/${abbrev}/${chapter}`);
    return result;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getChapterWithToken(version, abbrev, chapter, token) {
  try {
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
