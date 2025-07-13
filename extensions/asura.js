const axios = require('axios');
const cheerio = require('cheerio');
const BASE = 'https://asuracomic.net';

async function listManga() {
  const res = await axios.get(BASE, {
      headers: {
            'User-Agent': 'Mozilla/5.0',
                  'Accept-Language': 'en-US,en;q=0.9'
                      }
                        });
                          const $ = cheerio.load(res.data);
                            const list = [];
                              $('.bs #venser').each((i, el) => {
                                  const a = $(el).find('a').first();
                                      const url = a.attr('href');
                                          const id = url?.split('/').filter(Boolean).pop();
                                              const title = a.attr('title') || a.text().trim();
                                                  const cover = $(el).find('img').attr('src');
                                                      if (id && title) list.push({ id, title, cover });
                                                        });
                                                          return list;
                                                          }

                                                          async function getChapters(mangaId) {
                                                            const url = `${BASE}/${mangaId}/`;
                                                              const res = await axios.get(url, {
                                                                  headers: { 'User-Agent': 'Mozilla/5.0' }
                                                                    });
                                                                      const $ = cheerio.load(res.data);
                                                                        const chapters = [];
                                                                          $('#venser ul li').each((i, el) => {
                                                                              const a = $(el).find('a');
                                                                                  const href = a.attr('href');
                                                                                      const id = href?.split('/').filter(Boolean).pop();
                                                                                          const title = a.text().trim();
                                                                                              if (id && title) chapters.push({ id, title });
                                                                                                });
                                                                                                  return chapters;
                                                                                                  }

                                                                                                  async function getPages(chapterId) {
                                                                                                    const url = `${BASE}/${chapterId}/`;
                                                                                                      const res = await axios.get(url, {
                                                                                                          headers: { 'User-Agent': 'Mozilla/5.0' }
                                                                                                            });
                                                                                                              const $ = cheerio.load(res.data);
                                                                                                                const pages = [];
                                                                                                                  $('#venser img').each((i, el) => pages.push($(el).attr('src')));
                                                                                                                    return pages;
                                                                                                                    }

                                                                                                                    module.exports = { listManga, getChapters, getPages };