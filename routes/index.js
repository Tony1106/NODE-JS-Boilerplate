module.exports = function(app, db) {
  //Home page
  require("../modules/posts/Route")(app, db);
  // Handle errors
  require("./errors")(app, db);
};
