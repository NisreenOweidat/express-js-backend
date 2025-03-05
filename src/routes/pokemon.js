const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  
  const id = req.params.id;
  const pokemon = pokedex.find(p => p.id == id);
  
  if (pokemon) {
    res.json(pokemon);
    return;
  }
  
  res.status(501).json({ message: "Not Implemented" });
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  
  const name = req.params.name;
    const pokemon = pokedex.find(p => p.name.english === "Pikachu");
    if (!pokemon) {
        return res.status(404).json({ error: "Pokemon not found" });
    }
    res.json(pokemon);
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  
  const type = req.params.type;
  const pokemon = pokedex.filter(p => p.type.includes("Fire"));
  
  if (pokemon) {
    res.json(pokemon);
    return;
  }

  
  res.status(501).json({ message: "Not Implemented" });
  return;
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  
  const hp = req.params.hp;
  const pokemon = pokedex.filter(p => p.base.HP >= 90);
  
  if (pokemon) {
    res.json(pokemon);
    return;
  }
  
  
  
  res.status(501).json({ message: "Not Implemented" });
  return;
});

module.exports = router;
