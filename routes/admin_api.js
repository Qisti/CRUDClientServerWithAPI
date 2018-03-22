const express = require('express');
const router = express.Router();
const alert = require('alert-node');
const connection = require('../src/db_connect');

/* GET | get all data student */
router.get('/', function(req, res, next) {
  // Do the query to get data.
  connection.query('SELECT * FROM users', function(error, rows, fields) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": rows
      }));
    }
  });
});

/* POST | insert data student */
router.post('/input', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var email = req.body.email;

    if (password === password2) {
      connection.query('SELECT email FROM users WHERE email = ?', [email], function(error, rows) {
        if(error) throw error
        if(rows.length>0) {
          alert('Email already in use !');
        }
        connection.query('SELECT username FROM users WHERE username = ?', [username], function(err, rows) {
          if(rows.length>0) {
            alert("Username already in use !")
          } else {
              connection.query('INSERT INTO users (username, password, email) VALUES (? , sha1("7fa73b47df808d36c5fe328546ddef8b9011b2c6 ? "), ? )', [username, password, email], function(err, res) {
                if (err) throw err;
                console.log("admin berhasil ditambah");
                alert("Succes input admin !");
              
            });
              res.redirect('/admin/list');
            }
          });
  });

    // connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], function (error, results, fields) {
    //   if (error) {
    //     res.send(JSON.stringify({
    //       "status": 500,
    //       "error": error
    //     }));
    //   } else {
    //     res.send(JSON.stringify({
    //       "status": 200,
    //       "data": results
    //     }));
    //   }
    // });
}
})

module.exports = router;