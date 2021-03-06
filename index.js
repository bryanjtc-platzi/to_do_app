const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const csrf = require("csurf");
const helmet = require("helmet");
const csrfProtection = csrf({ cookie: true });
const app = express();

app.use(helmet());

// http
// cliente <-> servidor
// Verbo + URL
// Verbos http: GET, PATCH, POST, DELETE
// Url: http://localhost:3000/hello-world GET
// API

const db = {}

// camel case
function handleGetHelloWorld(req, res) {
  console.log(req.propiedadArbitraria);
  return res.json(db);
}

function handlePostHelloWorld(req, res) {
  const id = Math.random();
  db[id] = req.body;
  return res.send("Hola desde POST");
}

function testMiddleware1(req, res, next) {
  console.log("HOLA DESDE EL MIDDLEWARE");
  req.propiedadArbitraria = 100;
  next();
}

function testMiddleware2(req, res, next) {
  console.log("HOLA ESTOY EN EL 2");
  next();
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(testMiddleware1);
app.use(testMiddleware2);
app
  .route("/hello-world")
  .get(csrfProtection, handleGetHelloWorld)
  .post(handlePostHelloWorld);
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000...");
});
