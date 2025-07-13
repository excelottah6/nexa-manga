const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const mangadex = require("./extensions/mangadex");
const asuracomic = require("./extensions/asura");

app.get("/manga/mangadex", async (req, res) => {
  try {
      const data = await mangadex.listManga();
          res.json(data);
            } catch (e) {
                res.status(500).json({ error: e.message });
                  }
                  });

                  app.get("/manga/mangadex/search", async (req, res) => {
                    try {
                        const query = req.query.query || "";
                            const status = req.query.status;
                                const tags = req.query.tags || [];
                                    const limit = req.query.limit || 20;
                                        const data = await mangadex.searchManga(query, status, tags, limit);
                                            res.json(data);
                                              } catch (e) {
                                                  res.status(500).json({ error: e.message });
                                                    }
                                                    });

                                                    app.get("/manga/mangadex/:mangaId/chapters", async (req, res) => {
                                                      try {
                                                          const data = await mangadex.getChapters(req.params.mangaId);
                                                              res.json(data);
                                                                } catch (e) {
                                                                    res.status(500).json({ error: e.message });
                                                                      }
                                                                      });

                                                                      app.get("/manga/mangadex/:mangaId/:chapterId/pages", async (req, res) => {
                                                                        try {
                                                                            const data = await mangadex.getPages(req.params.chapterId);
                                                                                res.json(data);
                                                                                  } catch (e) {
                                                                                      res.status(500).json({ error: e.message });
                                                                                        }
                                                                                        });

                                                                                        app.get("/manga/asuracomic", async (req, res) => {
                                                                                          try {
                                                                                              const data = await asuracomic.listManga();
                                                                                                  res.json(data);
                                                                                                    } catch (e) {
                                                                                                        res.status(500).json({ error: e.message });
                                                                                                          }
                                                                                                          });

                                                                                                          app.get("/manga/asuracomic/:mangaId/chapters", async (req, res) => {
                                                                                                            try {
                                                                                                                const data = await asuracomic.getChapters(req.params.mangaId);
                                                                                                                    res.json(data);
                                                                                                                      } catch (e) {
                                                                                                                          res.status(500).json({ error: e.message });
                                                                                                                            }
                                                                                                                            });

                                                                                                                            app.get("/manga/asuracomic/:mangaId/:chapterId/pages", async (req, res) => {
                                                                                                                              try {
                                                                                                                                  const data = await asuracomic.getPages(req.params.chapterId);
                                                                                                                                      res.json(data);
                                                                                                                                        } catch (e) {
                                                                                                                                            res.status(500).json({ error: e.message });
                                                                                                                                              }
                                                                                                                                              });

                                                                                                                                              app.listen(port, () => {
                                                                                                                                                console.log(`Server running on port ${port}`);
                                                                                                                                                });