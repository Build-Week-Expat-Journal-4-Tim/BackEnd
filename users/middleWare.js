const jwt = require('jsonwebtoken');
const secrets = require('../data/config/secrets');
const Users = require('../users/users-model');



module.exports = {
  validLogIn,
  validPostId,
} 

const validLogIn = (req, res, next) => {
    try{
      const token = req.headers.authorization;
      
      if(token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if(err){
            res.status(401).json(`Shame on you! Stop trying to break in!`)
          } else {
            req.decodedJwt = decodedToken;
            console.log(req.decodedJwt);
            next();
          }
        })
      }
    } catch(err){
      next(err);
    }
   };

   const validPostId = (req, res, next) => {
    db.getById(req.params.id)
      .then((post) => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(400).json(`Invalid Post ID.`);
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(`Whoops, something went wrong! ${error}`)
        //take off error before deploying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
  }
   