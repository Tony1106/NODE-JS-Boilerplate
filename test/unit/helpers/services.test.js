const Services = require("../../../helpers/services");

describe("Helpers->Services", () => {
  describe("Create Service instance", () => {
    test("should create new instance Service with API_name and baseURL", () => {
      let service = new Services("newService", "http://localhost:4000");
      expect(service.API_name).toBe("newService");
      expect(service.config.baseURL).toBe("http://localhost:4000");
    });
  });

  describe("Set basic auth for service", () => {
    test("should add to config an auth object with username&password ", () => {
      let service = new Services("newService", "http://localhost:4000");
      service.setBasicAuth("username", "password");
      let auth = service.config.auth;
      expect(auth.username).toBe("username");
      expect(auth.password).toBe("password");
    });
  });

  describe("Create Axios instance", () => {
    let service = new Services("newService", "http://localhost:4000");

    test("should return an axios object with baseURL: http://localhost:4000", () => {
      service.createAxiosInstance();
      expect(service.axios.defaults.baseURL).toBe("http://localhost:4000");
    });
  });

  describe("Use Axios instance to request data ", () => {
    let service = new Services("dummyAPI", "https://reqres.in/api/");
    service.createAxiosInstance();

    test("should execute the GET request and return user object", async () => {
      expect.assertions(1);
      try {
        let res = await service.request("/user/1", "GET");
        expect(res.data).toBeTruthy();
      } catch (error) {}
    });

    test("should execute the POST request and return user object", async () => {
      let userData = {
        name: "morpheus",
        job: "leader"
      };
      expect.assertions(1);
      try {
        let res = await service.request("/user", "POST", userData);
        expect(res.data).toBeTruthy();
        expect(res.data.name).toBe("morpheus");
        expect(res.data.job).toBe("leader");
      } catch (error) {}
    });

    test("should throw error when request fail", async () => {
      expect.assertions(1);
      try {
        let res = await service.request("/user/e3423rferw32rfwe", "get");
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
