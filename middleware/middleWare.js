const jwt = require("jsonwebtoken");
const secrets = require("../database/secrets");
const bcrypt = require("bcryptjs");
const Posts = require("../middleware/posts-model");



const validPostId = (req, res, next) => {
  Posts.getById(req.params.id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json(`Invalid Post ID.`);
      }
    })
    .catch((error) => {
      res.status(500).json(`Oops, something went wrong.`);
   });
}

const validLogIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const authToken = authHeader.split(" ")[1];
    jwt.verify(authToken, secrets.jwtSecret, (err, token) => {
      if (err) {
        return res.status(404).json(`You are not authorized`);
      }
      req.token = token;
      next();
    });
  } else {
    res.status(400).json(`Sorry something went wrong.`);
  }
}


module.exports = {
  validPostId,
  validLogIn,
}