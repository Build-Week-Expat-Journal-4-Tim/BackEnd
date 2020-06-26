const request = require("supertest");

const server = require("../server.js");

const db = require("../database/dbConfig");

const Posts = require("../middleware/posts-model");

const Users = require("../middleware/users-model");

beforeEach(async () => {
  await db("posts").truncate();
  await db("users").truncate();
});

describe("posts/router.js", () => {
  describe("/", () => {

    test("should successfully get all posts", async () => {
      const user = {
        email: "TestTiffany3@gmail.com",
        password: "blah1739",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);

      const response = await request(server).get("/api/posts");
      expect(response.status).toEqual(200);
    });

    // test("should successfully create a post", async () => {
    //   const user = {
    //     email: "TestTiffany3@gmail.com",
    //     password: "blah1739",
    //   };
    //   const registerResponse = await request(server)
    //     .post("/api/auth/register")
    //     .send(user);

    //   const loginResponse = await request(server)
    //     .post("/api/auth/login")
    //     .send(user);

    //   const post = {
    //     title: "Summer Time!",
    //     location: "Hawaii",
    //     description:
    //       "The beach, palm trees and water!!!!",
    //     image:
    //       "https://unsplash.com/photos/KMn4VEeEPR8",
    //   };

    //   const response = await request(server)
    //     .post("/api/posts")
    //     .send(post)
    //     .set("Authorization", `Bearer ${loginResponse.body.token}`);
    //   expect(response.status).toEqual(201);
    // });

    test("wrong address should return error", async () => {
      const user = {
        email: "TestTiffany3@gmail.com",
        password: "blah1739",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const response = await request(server).get("/api/post");
      expect(response.status).toEqual(404);
    });

    test("should error when trying to create a post while not logged in", async () => {
      const user = {
        email: "TestTiffany3@gmail.com",
        password: "blah1739",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(user);
      const post = {
        title: "Summer Time",
        location: "Hawaii",
        description:
          "The beach, palm trees, and water!!!!!",
        image:
          "https://unsplash.com/photos/KMn4VEeEPR8",
      };
      const response = await request(server)
        .post("/api/posts")
        .send(post)
        .set("Authorization", `Bearer ${""}`);
      expect(response.status).toEqual(500);
    });

    test("should error when required fields aren't filled out", async () => {
      const user = {
        email: "TestTiffany3@gmail.com",
        password: "blah1739",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(user);
      const post = {
        description:
          "The beach, palm trees, and water!!!!!",
        image:
          "https://unsplash.com/photos/KMn4VEeEPR8",
      };
      const response = await request(server)
        .post("/api/posts")
        .send(post)
        .set("Authorization", `Bearer ${""}`);
      expect(response.status).toEqual(500);
    });
  });

  describe("/id", () => {
    test("should successfully get specified post", () => {
      const user = {
        email: "TestTiffany3@gmail.com",
        password: "blah1739",
      };
      const post = {
        title: "Summer Time",
        location: "Hawaii",
        description:
          "The beach, palm trees, and water!!!!!",
        image:
          "https://unsplash.com/photos/KMn4VEeEPR8",
      };

      Users
        .insert(user)
        .then((id) => {
          return Posts.insert({ ...post, user_id: id[0] });
        })
        .then((postId) => {
          return request(server).get(`/api/posts/${postId[0]}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
        })
        .catch((err) => {
          expect(false).toEqual(true);
        });
    });
  });
});
