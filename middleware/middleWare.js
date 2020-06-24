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
    jwt.verify(authToken, secrets.jwtSecret, (error, token) => {
      if (error) {
        return res.status(400).json(`You are not authorized.`);
      } else {
        req.token = token;
        console.log(req.token);
        next();
      }
    });
  } else {
    res.status(500).json(`Oops, something went wrong.`);
  }
}

const validUserEditPost = (req, res, next) => {
  if (req.token.user_id !== req.post.user_id) {
    return res.status(404).json(`Sorry, wrong user.`);
  }
  next();
};

const validUserEditSelf = (req, res, next) => {
  if (req.token.user_id !== Number(req.params.id)) {
    return res.status(400).json(`Sorry, You can't edit this.`);
  }
  next();
};

module.exports = {
  validPostId,
  validLogIn,
  validUserEditSelf,
  validUserEditPost
}