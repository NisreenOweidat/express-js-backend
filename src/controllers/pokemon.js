
const pokedex = require("../db/pokedex.json");


//=======================get/begin=======================//

exports.getHp = (req, res) => {
    const { gte, lte, gt, lt } = req.query;

  const filteredPokemons = pokedex.filter(p =>
    (!gte || p.base.HP >= gte) &&
    (!lte || p.base.HP <= lte) &&
    (!gt || p.base.HP > gt) &&
    (!lt || p.base.HP < lt)
  );

  res.json(filteredPokemons.length ? filteredPokemons : { message: "No Pokémon found" });

};


exports.getType = (req ,res) => {
  const queryType = req.params.type.toLowerCase();
  
  const pokemon = pokedex.filter(p => {
    if (Array.isArray(p.type)) {
      return p.type.some(t => t.toLowerCase() === queryType);
    } else {
      return p.type.toLowerCase() === queryType;
    }
  });

  if (!pokemon) {
    res.status(404).json({ error: "Pokemon not found" });
    return;
  }
  res.status(200).json(pokemon);
  return;
}


exports.getName = (req ,res) => {

  const queryName = req.params.name.toLowerCase();
    const pokemon = pokedex.find(p => p.name.english.toLowerCase() === queryName);
    if (!pokemon) {
        return res.status(404).json({ error: "Pokemon not found" });
    }
    res.json(pokemon);
};

exports.getId = (req, res) => {
  
  const id = req.params.id;
  const pokemon = pokedex.find(p => p.id == id);
  
  if (!pokemon) {
      return res.status(404).json({ error: "Pokemon not found" }); ;
  }
  res.json(pokemon);
};
//=======================get/ends=======================//


//delete

exports.deletePokemon = (req, res) => {
  const id = req.params.id;
  const index = pokedex.findIndex(p => p.id == id);
  if (index === -1) {
      return res.status(404).json({ error: "Pokemon not found" });
  }
  pokedex.splice(index, 1);
  res.json({ message: "Pokemon deleted successfully" });
};


// //update

exports.updatePokemon = (req, res) => {
  const id = req.params.id;
  const index = pokedex.findIndex(p => p.id == id);
  if (index === -1) {
      return res.status(404).json({ error: "Pokemon not found" });
  }
  pokedex[index] = { ...pokedex[index], ...req.body };
  res.json(pokedex[index]);
};    


// create 

exports.createPokemon = (req, res) => {
  const newPokemon = req.body;
  pokedex.push(newPokemon);
  res.status(201).json(newPokemon); 
}