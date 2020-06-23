const db = require("../database/dbConfig");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

function get() {
  return db("posts");
}

function getById(id) {
  return db("posts").where({ id }).first();
}

function insert(story) {
  return db("posts")
    .insert(story)
}

function update(id, changes) {
  return db("posts").where({ id }).update(changes);
}

function remove(id) {
    return db("posts").where({ id }).del();
}