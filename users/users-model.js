const db = require('../data/dbConfig');
const { findById } = require('../../../dataPersistance/web-sprint-challenge-authentication-and-testing/users/users-model');

module.exports = {
    //USERS =================
    addUser,
    findUser,
    findByParam,
    findById, 
    findByPost,
    remove,
    //POSTS ===========
    findPost,
    findByPostId,
    addPost,
    updatePost,
    removePost,
};

//for USERS !!!!!!!!!!!!!
function findUser(){
    return db('users').select('id', 'email', 'firstName', 'password');
};

function findByParam(param){
    return db('users').where(param);
};

async function addUser(user){
    const [id] = await db('users').insert(user);
    return findById(id);
};

function findById(id){
    return db('users').where({id}).first();
};

function findByPost(userId){
    return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.description', 'u.firstName as postedBy', 'p.title', 'p.location', 'p.image')
    .where('p.user_id', userId) 
};

function remove(id){
    return db('users').where({id}).del();
};

//for POSTS !!!!!!!!!!!!!!!!

function findPost(){
    return db('posts')
};

function findByPostId(id){
    return db('posts').where({id}).first();
};

function addPost(post){
    return db('posts').insert(post)
};

function updatePost(id, changes){
    return db('posts').where({id}).update(changes);
};

function removePost(id){
    return db('posts').where({id}).del()
}


