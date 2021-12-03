const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');


//ROUTE

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const path = require('path');

//MySQL


const app = express();

app.use(express.json());
app.use(cookieParser());

//Set des reponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '192.168.1.62:3030');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})





app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;