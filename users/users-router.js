const router = require('express').Router();

const Users = require('../users/users-model');

const validLogIn = require('./middleWare');

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Users.findById(id)
    .then(user => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json(`Invalid User ID.`)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(`Whoops, something went wrong! ${error}`)
        //take off error before deploying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
});

router.delete('/:id', validLogIn, (req, res) => {
    const {id} = req.params;

    Users.remove(id)
    .then(user => {
        if(user == 1){
            res.status(200).json(`User deleted! Great Job!`)
        } else {
            res.status(400).json(`ERROR: User couldn't be deleted`)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(`Whoops, something went wrong! ${error}`)
        //take off error before deploying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
});

module.exports = router;