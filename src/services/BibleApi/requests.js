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
