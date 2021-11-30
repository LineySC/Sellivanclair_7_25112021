const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql');

//ROUTE

const userRoutes = require('./routes/user');


//MySQL

const log = mysql.createConnection({
    host: process.env.BDD_HOST,
    user: process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_DATABASE
});

log.connect(function(err){
    if(err) {
        throw err
    }
    else{
        console.log("MySQL connected")
    }
});
const app = express();

//Set des reponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use(express.json());

const path = require('path');


app.use('/api', userRoutes)


module.exports = app;