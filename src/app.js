const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");


const indexRouter = require("./routes/index");
const pokemonRouter = require("./routes/pokemon");
const authRouter = require("./routes/auth");


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter); // localhost:3000 -> home page
app.use("/auth", authRouter); // localhost:3000/auth/ -> auth page for login and register
app.use("/pokemon", pokemonRouter);// localhost:3000/pokemon/ -> pokemon page for pokemon with hp / id / name/ type / create/ update/ delete
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
app.listen(3000,console.log("Server running on port 3000"));


