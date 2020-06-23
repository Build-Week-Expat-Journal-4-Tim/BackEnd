const db = require("../database/dbConfig");

module.exports = {
  getUser,
  getById,
  getUserPosts,
  getBy,
  insert,
  remove,
};

function getUser(){
  return db('users')
}

function getById(id) {
  return db("users").where({ id }).first();
}

function getUserPosts(userId) {
  return db("Posts as p")
    .join("Users as u", "u.id", "p.user_id")
    .select("p.id", "p.description", "p.username as postedBy", "p.title", "p.location", "p.image", "p.date")
    .where("p.user_id", userId)
}

function insert(user) {
  return db("users")
    .insert(user)
}

function getBy(filter) {
  return db("users").where(filter).first();
}

function remove(id) {
  return db("users").where({ id }).del();
}

