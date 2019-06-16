const logger = require("./logger");
const mongoose = require("./mongoose");
const config = require("../config");

module.exports = function() {
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on("error", () => logger.error("Can't connect to the mongoDB"));
  db.once("open", () => {
    logger.warn("Connect to the database success");
  });
};
