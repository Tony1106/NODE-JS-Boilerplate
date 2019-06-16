const Post = require("./Model");
const logger = require("../../core/logger");
const tickets = require("../../api/Zendesk/index");
const response = require("../../core/response");
const Joi = require("@hapi/joi");
const requestType = require("../../api/Zendesk/requestStatusType");
const Zendesk = require("./Model");
const zendesk = new Zendesk();

module.exports = {
  index: function(req, res) {
    let { per_page, page } = req.query;
    let endpoint = "/tickets.json";
    if (per_page && page) {
      const schema = {
        per_page: Joi.number()
          .integer()
          .greater(1),
        page: Joi.number()
          .integer()
          .greater(0)
      };
      //Validate the query, if it dosen't pass the validation, give the default end point without pagination
      Joi.validate({ per_page, page }, schema, (err, value) => {
        if (err) {
          logger.error(err);
          return;
        }
        endpoint = `${endpoint}?per_page=${per_page}&page=${page}`;
      });
    }
    tickets
      .request(endpoint, "get")
      .then(response => {
        zendesk.countRequest(Zendesk, requestType.request_success);
        return res.send(response);
      })
      .catch(err => {
        zendesk.countRequest(Zendesk, requestType.request_fail);
        return response.json(res, null, err, null);
      });
  },

  getUser: function(req, res) {
    tickets
      .request("/users.json", "get")
      .then(response => {
        zendesk.countRequest(Zendesk, requestType.request_success);
        return res.send(response);
      })
      .catch(err => {
        zendesk.countRequest(Zendesk, requestType.request_fail);
        return response.json(res, null, err, null);
      });
  },

  show: function(req, res) {
    let ticketID = req.params.id;

    const schema = {
      ticketID: Joi.number()
        .integer()
        .greater(0)
    };
    Joi.validate({ ticketID }, schema, (err, value) => {
      if (err) {
        return response.json(
          res,
          null,
          { msg: "Ticket ID must be an integer! Please try again" },
          null
        );
      }
    });
    tickets
      .request(`/tickets/${ticketID}.json`, "get")
      .then(response => {
        zendesk.countRequest(Zendesk, requestType.request_success);
        return res.send(response);
      })
      .catch(err => {
        zendesk.countRequest(Zendesk, requestType.request_fail);
        return response.json(res, null, err, null);
      });
  }
};
