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
        console.log("Connexion à MySQL réussie !")
    }
});

//ROUTE

const app = express();

module.exports = app;