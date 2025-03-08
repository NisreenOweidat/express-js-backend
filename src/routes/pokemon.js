const express = require("express");
const router = express.Router();


const pokemonControllers = require('../controllers/pokemon');

router.get("/hp", pokemonControllers.getHp);

router.get("/type/:type", pokemonControllers.getType);

router.get("/name/:name", pokemonControllers.getName);

router.get("/:id", pokemonControllers.getId);

module.exports = router;
