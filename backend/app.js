const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql');

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
        console.log("Connexion à MySQL réussie !")
    }
});

//ROUTE

const app = express();

module.exports = app;