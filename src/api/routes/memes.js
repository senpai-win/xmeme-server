const { Router } = require("express");

const Memes = require("../../services/Memes");

const route = Router();

// POST request to add Meme to a Collection
route.post("/memes", async (req, res) => {
  const data = req.body;
  try {
    const { name, url, caption} = data;
    // Both name and caption are required
    if(!name || !caption || !url ){
      res.sendStatus(400); // Bad Request
      return;
    }
    const { status, id } = await Memes.addMemeToCollection(data);
    status == -1 ? res.sendStatus(409) : res.json({ id : id });
  } catch (err) {
    console.log(err);
    // 500: Internal Server Error
    res.sendStatus(500);
  }
});

// GET request to get 100 latest Memes
route.get("/memes", async (req, res) => {
  try {
    const result = await Memes.getAllMemes();
    res.json(result);
  } catch (err) {
    console.log(err);
    // 500: Internal Server Error
    res.sendStatus(500);
  }
});

// GET Request to get Meme by Id
route.get("/memes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { status, result } = await Memes.getMemeById(id);
    status == -1 ? res.sendStatus(404) : res.json(result);
  } catch (err) {
    console.log(err);
    // 500: Internal Server Error
    res.sendStatus(500);
  }
});

// DELETE Request to delete Meme by Id
route.delete("/memes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { status } = await Memes.softDeleteMemeById(id);
    status == -1 ? res.sendStatus(400) : res.sendStatus(200);
  } catch (err) {
    console.log(err);
    // 500: Internal Server Error
    res.sendStatus(500);
  }
});

// PATCH Request to update Meme by Id
route.patch("/memes/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const { status } = await Memes.updateMeme(id, data);
    status == -1 ? res.sendStatus(400) : res.sendStatus(200); 
  } catch (err) {
    console.log(err);
    // 500: Internal Server Error
    res.sendStatus(500);
  }
});

module.exports = route;
