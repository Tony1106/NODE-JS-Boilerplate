const request = require("supertest");
const app = require("../../app");

//==================== tickets API test ====================

describe("Module->Tickets", () => {
  describe("GET /user", () => {
    test("should respond with with status 200 and json containing user info", async () => {
      const response = await request(app).get("/user");
      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeTruthy();
    });
  });

  describe("GET /tickets", () => {
    test("should respond with status 200", async () => {
      const response = await request(app).get("/tickets");
      expect(response.statusCode).toBe(200);
      expect(response.body.tickets).toBeTruthy();
    });

    test("should respond list of maximum 100 tickets", async () => {
      const response = await request(app).get("/tickets");
      let { totalCountTicket, tickets } = response.body;
      if (totalCountTicket > 100) expect(tickets.length).toBe(100);
    });

    test("should respond list of 10 tickets base on pagination: per_page: 10, page: 2", async () => {
      const response = await request(app)
        .get("/tickets")
        .query({ per_page: 10, page: 2 });
      let { totalCountTicket, tickets } = response.body;
      expect(tickets.length).toBe(10);
    });
  });

  describe("GET /tickets/:id", () => {
    test("should respond a json object of ticket with id: 2", async () => {
      let id = 2;
      const response = await request(app).get("/tickets/" + id);
      expect(response.statusCode).toBe(200);
      expect(response.body.ticket.id).toBe(id);
    });
    test("should respond status 404 if not found", async () => {
      let id = 999999;
      const response = await request(app).get("/tickets/" + id);
      expect(response.statusCode).toBe(404);
    });
  });
});
