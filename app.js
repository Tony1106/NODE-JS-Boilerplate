require("dotenv").config();

const config = require("./config");
const db = require("./core/mongo")();
const app = require("./core/express")(db);
const logger = require("./core/logger");

app.listen(config.port, () => {
  logger.warn("The server is runing on PORT: " + process.env.DB_PORT);
});
module.exports = app;
