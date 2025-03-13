
/**
 * This is the main entry point of the application. 
 * we call all the required libraries and paths,for working with file and directory paths.
 */

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser"); 
const logger = require("morgan"); 
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");

// import home page route
const indexRouter = require("./routes/index");

 // import all pokemon routes 
const pokemonRouter = require("./routes/pokemon");

// import all auth routes
const authRouter = require("./routes/auth");

 //create an express app as an object
const app = express();

//used for logging requests to the console  :  GET /pokemon/type/fire 304 4.684 ms - - 
app.use(logger("dev")); 

// read data from the body as json
app.use(express.json()); 

// read data from the body as url
app.use(express.urlencoded({ extended: false })); 

// middeleware that makes it easier to read and manipulate cookies , to remember information about the user
app.use(cookieParser()); 

// the static() : middleware function in Express. It serves static files and is based on serve-static like css , images,
app.use(express.static(path.join(__dirname, "public")));

// home page.
app.use("/", indexRouter); 

// auth page for login and register.
app.use("/auth", authRouter); 

// pokemon page for pokemon with hp / id / name/ type / create/ update/ delete.
app.use("/pokemon", pokemonRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// export the app object to be used in other files.
module.exports = app; 

app.listen(3000,console.log("Server running on port 3000"));


