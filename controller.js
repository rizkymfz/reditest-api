'use strict';

var response = require('./res');
var connection = require('./conn');
const bcrypt = require("bcrypt");

exports.index = function(req, res) {
    response.ok("connection success!", res)
};

exports.orders = function(req, res) {
    connection.query('SELECT * FROM order_histories', function (error, data, fields){
        if(error){
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else{
            res.send({
                "status":200,
                "message":"success",data
            });
        }
    });
};

exports.users = function(req, res) {
    var user_id = req.params.id
    connection.query('SELECT * FROM users WHERE id = ?',[user_id], function (error, data, fields){
        if(error){
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else{
            res.send({
                "status":200,
                "message":"success",
                "data": data[0]
            });
        }
    });
};

exports.register = function(req, res) {
        
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    const data = req.body;

    connection.query('INSERT INTO users (name, username, password) values (?,?,?)',
    [name, username, password ], 
    function (error, rows, fields){
        if(error){
            res.send({
                "status":400,
                "failed":"error ocurred"
            })
        } else{
            if(name === '' || username === '' || password === ''){
                res.send({
                    "status":201,
                    "message":"all field cannot be blank!",
                    "data":{}
                });
            }else{
                data.id = rows.insertId
                res.send({
                    "status":200,
                    "message":"Register successfully!", data,
                });
            }
        }
    });
};

exports.login = function(req,res){
  var username= req.body.username;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE username = ?',[username, password], 
    function (error, response,rows, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', response);
    if(response.length >0){
        let data = response[0]
        if(data.password == password){
        res.send({
          "status":200,
          "message":"login success",data
            });
      }
      else{
        res.send({
          "status":204,
          "message":"Username and password does not match",
          "data": {}
            },204);
      }
    }
    else{
      res.send({
        "status":204,
        "message":"Username does not exits",
        "data": {}
          },204);
    }
  }
  });
}
