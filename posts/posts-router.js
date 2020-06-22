const router = require('express').Router();

const Users = require('../users/users-model');
const {validLogIn, validPostId} = require('../users/middleWare');

router.get('/', (req, res) => {
    Users.findPost()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(`Whoops, something went wrong! ${error}`)
        //take off error before deploying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
});


router.get('/:id', validPostId, (req, res) => {
    console.log('req GET/id: ', req);
    res.status(200).json(req.post)
});


router.post('/', validLogIn, (req, res) => {
    const post = req.body;

    post.user_id = req.token.user_id;
    post.date = new Date().toDateString();
    Users.addPost(post)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(`Whoops, something went wrong! ${error}`)
        //take off error before deploying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
});

router.put('/:id', validLogIn, validPostId, (req, res) => {
    const {id} = req.params;

    Users.updatePost(Number(id), req.body)
    .then(post => {
        if(post === 1){
            res.status(202).json(post)
        } else {
            res.status(404).json(`Invalid Post Id.`)
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

    Users.removePost(Number(id))
    .then(post => {
        if(post == 1){
            res.status(200).json(`Post deleted! Great Job!`)
        } else {
            res.status(400).json(`ERROR: Post couldn't be deleted`)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(`Whoops, something went wrong! ${error}`)
        //take off error before deploying!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
})
