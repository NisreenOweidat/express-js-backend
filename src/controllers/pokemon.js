/**
 * This file is for creating all the functions that are related to pokemon.
 * it will be called in the routes that are related to pokemon.
 */


// import the pokedex db.
const pokedex = require("../db/pokedex.json");


//=======================get/begin=======================//

/**
 * this function is for getting all the pokemon that have a specific hp from the query params,
 * from the db file, after filtering the data.
 */
exports.getHp = (req, res) => {
  // get the query params
    const { gte, lte, gt, lt } = req.query;

    // filter the data from the db
  const filteredPokemons = pokedex.filter(p =>
    (!gte || p.base.HP >= gte) &&
    (!lte || p.base.HP <= lte) &&
    (!gt || p.base.HP > gt) &&
    (!lt || p.base.HP < lt)
  );

  //return the filtered data as json, or an error if there is no data.
  res.json(filteredPokemons.length ? filteredPokemons : { message: "No Pokémon found" });

};

/**
 * retrieves Pokemon from the pokedex db based on a specific type.
 * by checking if the type is an array or not.
 * we used -toLowerCase()- function because the data that is saved in db is case sensitive.
 */
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

/**
 * this function is for getting pokemon by name from the db.
 * also used -toLowerCase()- function because the data that is saved in db is case sensitive.
 */
exports.getName = (req ,res) => {

  const queryName = req.params.name.toLowerCase();
    const pokemon = pokedex.find(p => p.name.english.toLowerCase() === queryName);
    if (!pokemon) {
        return res.status(404).json({ error: "Pokemon not found" });
    }
    res.json(pokemon);
};


/**
 * this function is for getting pokemon by id from the db
 * used -find()- for specific id.
 */
exports.getId = (req, res) => {
  
  const id = req.params.id;
  const pokemon = pokedex.find(p => p.id == id);
  
  if (!pokemon) {
      return res.status(404).json({ error: "Pokemon not found" }); ;
  }
  res.json(pokemon);
};
//=======================get/ends=======================//


/**
 * this function is for deleting pokemon by id from the db
 * using splice() function to delete spicific pokemon by id,
 * here it takes the -index- parameter as -start-.
 */
exports.deletePokemon = (req, res) => {
  
  // get the id from the url params
  const id = req.params.id;

  // delete the pokemon from the db by its id 
  const index = pokedex.findIndex(p => p.id == id);

  // if id not found return error msg as json
  if (index === -1) {
      return res.status(404).json({ error: "Pokemon not found" });
  }

  // else : delete the pokemon from the db.
  pokedex.splice(index, 1);
  res.json({ message: "Pokemon deleted successfully" });
};





/**
 * this function is for creating new pokemon in the db
 */
exports.createPokemon = (req, res) => {

  // get the new pokemon data from the request body
  const newPokemon = req.body;

  // from the authenticateUser middleware, it let us know the user that created this pokemon.
  const user = req.user; 
  res.json(user);

  // add the new pokemon to the db
  pokedex.push(newPokemon);
  res.status(201).json(newPokemon); 
 
}

//update


/**
 * this function is for updating pokemon by id from the db
 */
exports.updatePokemon = (req, res) => {

  const id = req.params.id;
  const index = pokedex.findIndex(p => p.id == id);
  if (index === -1) {
      return res.status(404).json({ error: "Pokemon not found" });
  }

  // takes old pokemon data from the db and updates it with the new data from the request body
  pokedex[index] = { ...pokedex[index], ...req.body };
  res.json(pokedex[index]);
};    

