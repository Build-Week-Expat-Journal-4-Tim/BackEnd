const express = require("express");
const router = express.Router();
const Users = require("../middleware/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../database/secrets");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  Users.insert(user)
    .then((newUser) => {
      if(newUser) {
      res.status(201).json(`User ${user.firstName} has been registered!`);
    } else {
      res.status(404).json(`Sorry, user not added.`);
    }
  })
    .catch((error) => res.status(500).json(`Oops, something went wrong.`));
});


router.post('/login', (req, res, next) => {
  let {email, password} = req.body;

  Users.getBy({email})
  .then(user => {
    if(user || bcrypt.compareSync(password, user.password)){
      const token = genToken(user);
      res.status(200).json({message: `Welcome, ${user.firstName}!`, user, token: token})
    } else {
      res.status(401).json(`Uhhh...wrong info. You are being deleted...jk!`)
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(`Oops, something went wrong.`)
  });
});

router.get('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy(error => {
          if(error) {
              res.status(500).json({errorMessage: "Failed to logout"})
          } else {
              res.status(200).json({successMessage: "Yippie!! You're FREEE!!!"})
          }
      });
  }
})


function genToken(user){
  const payload = {
    user_id: user.id,
    firstName: user.firstName,
    email: user.email
  };
  const options = {expiresIn: '3h'};
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}


module.exports = router;