const request = require("supertest");

const server = require("../server");

const db = require("../database/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("auth/router", () => {
  describe("register", () => {
    test("should successfully register user", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(201);
    });

    test("it should error without a password", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
      };
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(500);
    });


    test("it should error without a email", async () => {
      const user = {
        password: "blah357",
      };
    
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(500);
    });

    test("should error if route is incorrect", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server).post("/api/register").send(user);
      expect(response.status).toEqual(404);
    });

    test("errors when incorrect CRUD method is used, Edit", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server)
        .put("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(404);
    });

    test("errors when incorrect CRUD method is used, Delete", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server)
        .delete("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(404);
    });

    test("errors when incorrect CRUD method is used, Get", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server)
        .get("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(404);
    });
  });

  describe("login", () => {
    test("should successfully login", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const response = await request(server)
        .post("/api/auth/login").send(user);
      expect(response.status).toEqual(200);
    });
    
    test("it should error without a email", async () => {
      const user = {
        password: "blah357",
      };
      const response = await request(server).post("/api/auth/login").send(user);
      expect(response.status).toEqual(500);
    });

    test("should error if route is incorrect", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server).post("/api/login").send(user);
      expect(response.status).toEqual(404);
    });

    test("errors when incorrect CRUD method is used, Edit", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server).put("/api/auth/login").send(user);
      expect(response.status).toEqual(404);
    });

    test("errors when incorrect CRUD method is used, Delete", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server)
        .delete("/api/auth/login")
        .send(user);
      expect(response.status).toEqual(404);
    });

    test("errors when incorrect CRUD method is used, Get", async () => {
      const user = {
        email: "TestTiffany@gmail.com",
        password: "blah357",
      };
      const response = await request(server).get("/api/auth/login").send(user);
      expect(response.status).toEqual(404);
    });
  });
});