const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authorziedRouter = require('./routers/authorized-router');
const usersRouter = require('./routers/users-router');
const postsRouter = require('./routers/posts-router');

const server = express();

server.use(helmet());
//add logger here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
server.use(cors());
server.use(express.json());
server.use('/api/auth', authorziedRouter);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.status(200).json(`The server is running...better go catch it!`)
})

module.exports = server
