const axios = require("axios");
const logger = require("../core/logger");

module.exports = class Services {
  constructor(API_name, baseURL) {
    this.API_name = API_name;

    this.config = {
      baseURL
    };
    this.axios = {};
  }
  setBasicAuth(username, password) {
    this.config = {
      ...this.config,
      auth: {
        username,
        password
      }
    };
  }
  createAxiosInstance() {
    this.axios = axios.create(this.config);
    return this;
  }
  request(url, method = "GET", data) {
    return new Promise((resolve, reject) => {
      this.axios
        .request({
          url,
          method,
          data
        })
        .then(response => {
          if (response.data) {
            return resolve(response.data);
          } else {
            return reject(response);
          }
        })
        .catch(error => {
          logger.error(
            `Request to the API: ${this.API_name} is error!}`,
            error.response.data.error
          );
          return reject({
            status: error.response.status,
            msg: error.response.data.error
          });
        });
    });
  }
};
