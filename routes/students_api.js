const express = require('express');
const router = express.Router();
const connection = require('../src/db_connect');

/* GET | get all data student */
router.get('/', function(req, res, next) {
  // Do the query to get data.
  connection.query('SELECT * FROM students', function(error, rows, fields) {
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
    var id_student = req.body.id_student;
    var name= req.body.name;
    var gender = req.body.gender;
    var date_of_birth = req.body.date_of_birth;
    var address = req.body.address;
    var mail = req.body.mail
  
    connection.query('INSERT INTO students (id_student, name, gender, date_of_birth, address, mail) VALUES (?, ?, ?, ?, ?, ?)', [id_student, name, gender, date_of_birth, address, mail], function (error, results, fields) {
      if (error) {
        res.send(JSON.stringify({
          "status": 500,
          "error": error
        }));
      } else {
        res.send(JSON.stringify({
          "status": 200,
          "data": results
        }));
      }
    });
});

/* PUT | edit data student */
router.put('/update/:id', function(req, res){
    var id_student = req.body.id_student;
    var name= req.body.name;
    var gender = req.body.gender;
    var date_of_birth = req.body.date_of_birth;
    var address = req.body.address;
    var mail = req.body.mail 
    
      connection.query('UPDATE students SET name = ?, gender = ?, date_of_birth = ?, address= ?, mail = ? WHERE id_student = ?', [name, gender, date_of_birth, address, mail, id_student], function (error, results, fields) {
        if (error) {
          res.send(JSON.stringify({
            "status": 500,
            "error": error
          }));
        } else {
          res.send(JSON.stringify({
            "status": 200,
            "data": results
          }));
        }
      });
});

/* DELETE | delete data student */
router.delete('/delete/:id', function (req, res) {
    console.log("sampe sini");
    connection.query('DELETE FROM students WHERE id_student = ?', [req.params.id], function(error, results) {
      if (error) {
        res.send(JSON.stringify({
          "status": 500,
          "error": error
        }));
      } else {
        res.send(JSON.stringify({
          "status": 200,
          "data": results
        }));
      }
    });
  });

module.exports = router;