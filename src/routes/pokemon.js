const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");



// router.get("/hp",  (req, res, next) =>{
//   const filredParams = req.query;
//   res.json(filredParams)
 
// });
router.get("/hp", (req, res) => {
  const { gte, lte, gt, lt } = req.query;

  const filteredPokemons = pokedex.filter(p =>
    (!gte || p.base.HP >= gte) &&
    (!lte || p.base.HP <= lte) &&
    (!gt || p.base.HP > gt) &&
    (!lt || p.base.HP < lt)
  );

  res.json(filteredPokemons.length ? filteredPokemons : { message: "No Pokémon found" });
});




router.get("/type/:type", (req, res, next) => {
  const queryType = req.params.type.toLowerCase();
  
  const pokemon = pokedex.filter(p => {
    if (Array.isArray(p.type)) {
      return p.type.some(t => t.toLowerCase() === queryType);
    } else {
      return p.type.toLowerCase() === queryType;
    }
  });

  if (pokemon.length === 0) {
    res.status(404).json({ error: "Pokemon not found" });
    return;
  }
  res.status(200).json(pokemon);
  return;
});





//
router.get("/name/:name",  (req, res, next) =>  {

  const queryName = req.params.name.toLowerCase();
    const pokemon = pokedex.find(p => p.name.english.toLowerCase() === queryName);
    if (!pokemon) {
        return res.status(404).json({ error: "Pokemon not found" });
    }
    res.json(pokemon);
});

//
router.get("/:id",  (req, res, next) => {
  
  const id = req.params.id;
  const pokemon = pokedex.find(p => p.id == id);
  
  if (pokemon) {
    res.json(pokemon);
    return;
  }

  return res.status(404).json({ error: "Pokemon not found" });
  return;
});


//

module.exports = router;
