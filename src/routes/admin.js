const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/register', (req, res) => {
    res.render('register.html');
}); 

app.get('/orders', (req, res) => {
    res.render('orders.html');
}); 

module.exports = app;