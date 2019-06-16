let config = require("../config");
let logger = require("../core/logger");

let response = require("../core/response");

module.exports = function(app) {
  app.use(function(err, req, res, next) {
    if (!err) {
      return next();
    }

    logger.error(err.stack);
    res.status(err.status || 500);

    // Respond with json
    if (req.accepts("json")) {
      return response.json(res, null, response.SERVER_ERROR, err.message);
    }
  });

  app.use(function(req, res) {
    res.status(404);

    // Respond with json
    if (req.accepts("json")) {
      return response.json(res, null, response.NOT_FOUND);
    }
  });
};
