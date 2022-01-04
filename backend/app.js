const express = require('express');
const dotenv = require('dotenv').config();
const helmet = require('helmet');

//ROUTE
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');

const path = require('path');
const app = express();

app.use(express.json());

app.use(helmet());

//Set des reponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;