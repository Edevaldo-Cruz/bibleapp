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
