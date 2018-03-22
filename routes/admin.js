const express = require('express');
const router = express.Router();
// const connection = require('../connection');
const moment = require('moment');
const axios = require('axios');
const connection = require('../src/db_connect');
const env = process.env.NODE_ENV || 'development';
const config = require('../conf/config');

/* GET data student */
router.get('/', function(req, res, next) {
    // Make a request for a user with a given ID
    axios.get(config.server.host+'/api/admin')
    .then(function (response) {
      res.render('adminList', {title: 'Student List', data: response.data.data});
    })
    .catch(function (error) {
      console.log(error);
    });
      // res.render('index');
});

router.get('/add', function(req, res, next) {
    // Render index.pug page using array 
    res.render('inputUser', {title: 'Add Admin'});
});

router.post('/add', function(req, res, next) {
    axios.post(config.server.host+'/api/admin/input', {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status === 200) {
        res.redirect('/');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;