const request = require("supertest");

const server = require("../server.js");

const db = require("../database/dbConfig")


beforeEach(async () => {
  await db("users").truncate();
});


describe("users/router.js", () => {
  describe("/id", () => {

    test("should successfully get specified user", async () => {
      const user = {
        email: "TestTiffany2@gmail.com",
        password: "blah7913",
      }
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user)
      
      const response = await request(server)
        .get("/api/users/1")
      expect(response.status).toEqual(200);
    });

    test("user not found", async () => {
      const response = await request(server).get("/api/users/15");
      expect(response.status).toEqual(404);
    });

      test("should error when trying to use wrong method", async () => {
        const user = {
          email: "TestTiffany2@gmail.com",
          password: "blah7913",
        };
        const registerResponse = await request(server)
          .post("/api/auth/register")
          .send(user);
        const loginResponse = await request(server)
          .post("/api/auth/login")
          .send(user);
        const response = await request(server)
          .post("/api/users/1")
          .set("Authorization", `Bearer ${loginResponse.body.token}`);
        expect(response.status).toEqual(404);
      });
    
  });
});