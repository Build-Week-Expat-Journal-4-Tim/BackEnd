const router = require('express').Router();
const bcrypt = require('bcryptjs');
const secrets = require('../data/config/secrets');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 16);
    user.password = hash;

    Users.addUser(user)
    .then(newUser => {
        const token = genToken(newUser);
        res.status(201).json({created_user: newUser, token: token})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(`Whoops, something went wrong! ${error}`)
        //take off error before deploying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
});

router.post('/login', (req, res) => {
    let {email, password} = req.body;

    Users.findByParam({email}).first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = genToken(user);
            res.status(200).json({email: user.email, token: token})
        } else {
            res.status(401).json(`Wrong Info. You're being deleted...jk!`)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(`Whoops, something went wrong! ${error}`)
        //take off error before deploying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
})

function genToken(user){
    const payload = {
        userid: user.id,
        email: user.email,
        firstName: user.firstName
    };
    const options = {expires: '3h'};
    const token = jwt.sign(payload, secrets.jwtSecret, options);
    return token;
}

module.exports = router;