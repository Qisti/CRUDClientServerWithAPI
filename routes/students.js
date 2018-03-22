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
  axios.get(config.server.host+'/api/students')
  .then(function (response) {
    res.render('index', {title: 'Student List', data: response.data.data});
  })
  .catch(function (error) {
    console.log(error);
  });
    // res.render('index');
  });

router.get('/input', function(req, res, next) {
    // Render index.pug page using array 
    res.render('input', {title: 'Add Student'});
  });

router.post('/input', function(req, res, next) {
  axios.post(config.server.host+'/api/students/input', {
    id_student: req.body.id_student, 
    name: req.body.name, 
    gender: req.body.gender, 
    date_of_birth: req.body.date_of_birth,
    address: req.body.address, 
    mail: req.body.mail
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

router.post('/update', function(req, res) {
    axios.put(config.server.host+'/api/students/update/'+[req.body.id_student], {
      id_student: req.body.id_student, 
      name: req.body.name, 
      gender: req.body.gender, 
      date_of_birth: req.body.date_of_birth,
      address: req.body.address
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

router.get('/update/:id', function(req, res){
  connection.query('SELECT * FROM students WHERE id_student = ?', 
  [req.params.id], function(err, rows, fields) {
      if(err) throw err
      // if user not found
    if (rows.length <= 0) {
      res.redirect('/students')
    } else { 
      var studentDoB = moment(rows[0].date_of_birth).format('YYYY-MM-DD');
      // if user found
      // render to views/index.pug template file
      res.render('edit', {
        title: 'Edit Student', 
        Id_student: rows[0].id_student,
        Name: rows[0].name,
        Address: rows[0].address,
        Gender: rows[0].gender,
        Date_of_birth: studentDoB,
        Mail: rows[0].mail,
        sOldId: rows[0].id_student
      })
    }            
  });
});

router.post('/delete/:id', function(req, res, next) {
    axios.delete(config.server.host+'/api/students/delete/'+[req.params.id])
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