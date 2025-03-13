const express = require("express");
const router = express.Router();


const pokemonControllers = require('../controllers/pokemon');
const { authenticateUser } = require("../middleware/authMiddleware");

// GUEST
router.get("/hp", pokemonControllers.getHp);

router.get("/type/:type", pokemonControllers.getType);

router.get("/name/:name", pokemonControllers.getName);

router.get("/:id", pokemonControllers.getId);


//user
router.post("/", authenticateUser); // authenticate user middleware 

router.put("/:id", authenticateUser); 

router.delete("/:id", authenticateUser);

router.delete("/:id", pokemonControllers.deletePokemon);

router.put("/:id", pokemonControllers.updatePokemon);

router.post("/", pokemonControllers.createPokemon); 

module.exports = router;
