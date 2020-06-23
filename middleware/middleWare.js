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
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        return res.status(401).json(`You are not authorized.`);
      } else {
        req.decodedJwt = decodedToken;
        console.log(req.decodedJwt);
        next();
      }
    });
  } else {
    res.status(500).json(`Oops, something went wrong.`);
  }
}

const validUserEditPost = (req, res, next) => {
  if (req.token.userid !== req.post.user_id) {
    return res.status(403).json(`Sorry, wrong user.`);
  }
  next();
};

const validUserEditSelf = (req, res, next) => {
  if (req.token.userid !== Number(req.params.id)) {
    return res.status(403).json(`Sorry, You can't edit this.`);
  }
  next();
};

module.exports = {
  validPostId,
  validLogIn,
  validUserEditSelf,
  validUserEditPost
}