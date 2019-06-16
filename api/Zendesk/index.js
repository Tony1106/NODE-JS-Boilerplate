const Services = require("../../helpers/services");
const config = require("../../config/index");
const { username, password } = config.api.zendesk.basicAuth;
const tickets = new Services("Tickets", "https://tony1106.zendesk.com/api/v2/");
tickets.setBasicAuth(username, password);
tickets.createAxiosInstance();
module.exports = tickets;
