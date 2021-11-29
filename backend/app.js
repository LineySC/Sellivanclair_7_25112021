const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql');

//MySQL

const log = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "LmKES8612aZ*",
    database: "p7"
});

log.connect(function(err){
    if(err) {
        throw err
    }
    else{
        console.log("Connected as id " + log.threadId)
    }
});

//ROUTE

const app = express();

module.exports = app;