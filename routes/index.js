module.exports = function(app, db) {
  //_________Register the services below___________

  //Zendesk service
  require("../modules/Zendesk/Route")(app, db);
  // Handle errors
  require("./errors")(app, db);
};
