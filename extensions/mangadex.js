const axios = require("axios");

async function listManga() {
  const res = await axios.get("https://api.mangadex.org/manga", {
      params: {
            limit: 10,
                  includes: ["cover_art"],
                        availableTranslatedLanguage: ["en"],
                            },
                              });

                                return res.data.data.map(manga => {
                                    const coverRel = manga.relationships.find(r => r.type === "cover_art");
                                        const fileName = coverRel?.attributes?.fileName;
                                            const cover = `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;
                                                return {
                                                      id: manga.id,
                                                            title: manga.attributes.title.en,
                                                                  cover,
                                                                      };
                                                                        });
                                                                        }

                                                                        async function searchManga({ query, status, tags, limit }) {
                                                                          const res = await axios.get("https://api.mangadex.org/manga", {
                                                                              params: {
                                                                                    title: query,
                                                                                          status: status,
                                                                                                includedTags: tags?.split(","),
                                                                                                      limit: limit || 10,
                                                                                                            includes: ["cover_art"],
                                                                                                                  availableTranslatedLanguage: ["en"],
                                                                                                                      },
                                                                                                                        });

                                                                                                                          return res.data.data.map(manga => {
                                                                                                                              const coverRel = manga.relationships.find(r => r.type === "cover_art");
                                                                                                                                  const fileName = coverRel?.attributes?.fileName;
                                                                                                                                      const cover = `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;
                                                                                                                                          return {
                                                                                                                                                id: manga.id,
                                                                                                                                                      title: manga.attributes.title.en,
                                                                                                                                                            cover,
                                                                                                                                                                };
                                                                                                                                                                  });
                                                                                                                                                                  }

                                                                                                                                                                  async function getChapters(mangaId) {
                                                                                                                                                                    const res = await axios.get("https://api.mangadex.org/chapter", {
                                                                                                                                                                        params: {
                                                                                                                                                                              manga: mangaId,
                                                                                                                                                                                    translatedLanguage: ["en"],
                                                                                                                                                                                          order: { chapter: "asc" },
                                                                                                                                                                                                limit: 50,
                                                                                                                                                                                                    },
                                                                                                                                                                                                      });

                                                                                                                                                                                                        return res.data.data.map(chapter => ({
                                                                                                                                                                                                            id: chapter.id,
                                                                                                                                                                                                                chapter: chapter.attributes.chapter,
                                                                                                                                                                                                                    title: chapter.attributes.title,
                                                                                                                                                                                                                      }));
                                                                                                                                                                                                                      }

                                                                                                                                                                                                                      async function getChapterPages(chapterId) {
                                                                                                                                                                                                                        const res = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
                                                                                                                                                                                                                          const baseUrl = res.data.baseUrl;
                                                                                                                                                                                                                            const chapter = res.data.chapter;

                                                                                                                                                                                                                              return chapter.data.map(filename => `${baseUrl}/data/${chapter.hash}/${filename}`);
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                              async function getMangaDetails(mangaId) {
                                                                                                                                                                                                                                const res = await axios.get(`https://api.mangadex.org/manga/${mangaId}`, {
                                                                                                                                                                                                                                    params: {
                                                                                                                                                                                                                                          includes: ["cover_art", "author"],
                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                  const manga = res.data.data;
                                                                                                                                                                                                                                                    const title = manga.attributes.title.en || "";
                                                                                                                                                                                                                                                      const description = manga.attributes.description.en || "";
                                                                                                                                                                                                                                                        const status = manga.attributes.status || "";
                                                                                                                                                                                                                                                          const tags = manga.attributes.tags.map(tag => tag.attributes.name.en);
                                                                                                                                                                                                                                                            const authors = manga.relationships.filter(r => r.type === "author").map(a => a.attributes.name);
                                                                                                                                                                                                                                                              const coverRel = manga.relationships.find(r => r.type === "cover_art");
                                                                                                                                                                                                                                                                const fileName = coverRel?.attributes?.fileName;
                                                                                                                                                                                                                                                                  const cover = `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;

                                                                                                                                                                                                                                                                    return {
                                                                                                                                                                                                                                                                        id: manga.id,
                                                                                                                                                                                                                                                                            title,
                                                                                                                                                                                                                                                                                description,
                                                                                                                                                                                                                                                                                    status,
                                                                                                                                                                                                                                                                                        tags,
                                                                                                                                                                                                                                                                                            authors,
                                                                                                                                                                                                                                                                                                cover,
                                                                                                                                                                                                                                                                                                  };
                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                  module.exports = {
                                                                                                                                                                                                                                                                                                    listManga,
                                                                                                                                                                                                                                                                                                      searchManga,
                                                                                                                                                                                                                                                                                                        getChapters,
                                                                                                                                                                                                                                                                                                          getChapterPages,
                                                                                                                                                                                                                                                                                                            getMangaDetails,
                                                                                                                                                                                                                                                                                                            };