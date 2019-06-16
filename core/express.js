const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const logger = require("../core/logger");
const config = require("../config");

function initMiddleWares(app) {
  // Configure express app
  app.set("port", config.port);
  // Request body parsing middleware should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: config.contentMaxLength * 2
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());

  //Cors
  app.use(cors());

  //Log the request
  app.use(morgan("tiny"));
}
module.exports = function(db) {
  const app = express();

  //Register middleware
  initMiddleWares(app);
  //Load routes

  require("../routes")(app, db);

  return app;
};
