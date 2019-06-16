let pkg = require("../package.json");

module.exports = {
  app: {
    title: pkg.title,
    version: pkg.version,
    description: pkg.description,
    url: "http://localhost:" + (process.env.PORT || 3000) + "/"
  },
  port: process.env.DB_PORT || 3000,
  api: {
    zendesk: {
      basicAuth: {
        username: process.env.ZENDESK_USERNAME,
        password: process.env.ZENDESK_PASSWORD
      },
      baseURL: "https://tony1106.zendesk.com/api/v2"
    }
  },
  db: {
    uri:
      process.env.MONGO_URI ||
      "mongodb://localhost/" + process.env.DB_NAME + "-dev",
    options: {
      user: "",
      pass: "",
      keepAlive: 1,
      useNewUrlParser: true
    }
  }
};
