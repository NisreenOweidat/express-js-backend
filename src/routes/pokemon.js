/**
 * This file is for creating all the routes that are related to pokemon.
 * depending on the user role , GUST or AUTHENTICATED USER.
 */
const express = require("express");
const router = express.Router();


// call pokemon controller to use its functions in routes
const pokemonControllers = require('../controllers/pokemon'); 

// call auth middleware to to know the user if it was authenticated or not.
const { authenticateUser } = require("../middleware/authMiddleware"); 


// GUEST : only get data about pokemon 
router.get("/hp", pokemonControllers.getHp);

router.get("/type/:type", pokemonControllers.getType);

router.get("/name/:name", pokemonControllers.getName);

router.get("/:id", pokemonControllers.getId);


/** 
 *  USER : can create , update , delete pokemon.
 * the middleware will check if the user is authenticated or not,
 * then after it i`ll put the controller function.
 * 
 * contrellers functions will do the work of creating , updating , deleting pokemon
 */ 

//only the authenticated user can create , update , delete pokemo
router.post("/", authenticateUser, pokemonControllers.createPokemon);

router.put("/:id", authenticateUser, pokemonControllers.updatePokemon); 

router.delete("/:id", authenticateUser , pokemonControllers.deletePokemon); 

module.exports = router;
