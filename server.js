const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const authorziedRouter = require('./authorized/authorized-router');
// const usersRouter = require('./users/users-router');
// const postsRouter = require('./posts/posts-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
// server.use('/api/authorized', authorziedRouter);
// server.use('/api/users', usersRouter);
// server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.status(200).json(`You got in...the info is yours! Server Listening!`)
})

module.exports = server