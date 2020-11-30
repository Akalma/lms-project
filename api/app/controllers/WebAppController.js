require("dotenv").config();
const { validationResult }  = require("express-validator");
const jwt                   = require("jsonwebtoken");
var mysql                   = require('mysql');
var moment                  = require('moment');
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { date } = require("yup");

const JWT_SECRET = process.env.JWT_SECRET;
const DB_NAME       = process.env.DB_NAME;
const DB_HOST      = process.env.DB_HOST;
const DB_PASSWORD      = process.env.DB_PASSWORD;
const DB_USERNAME      = process.env.DB_USERNAME;

var connection = mysql.createConnection({
  host     : DB_HOST,
  user     : DB_USERNAME,
  password : DB_PASSWORD,
  database : DB_NAME
});

connection.connect()

module.exports = {

  login: function (req, res) {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
      });
    } else {

      // var sql = "SELECT * FROM appusers WHERE email = "+connection.escape(req.body.email)+" AND  password = MD5("+connection.escape(req.body.password)+") ";
     var sql = "SELECT * FROM users WHERE email = "+connection.escape(req.body.email)+" AND  password = "+connection.escape(req.body.password);
     connection.query(sql, function (err, result) {
        if (err) {
          res.status(200).send({
            status: "error",
            message: err,
          });
        }else{
          if(result.length > 0){
            res.status(200).send({
              status: "success",
              message: "Logged in",
              result: result[0],
            });
          }else{
            res.status(200).send({
              status: "error",
              message: "Invalid username or password"
            });
          }
        }
      });
    }
  },

  create_data: function (req, res) {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
      });
    } else {

      var sql = "INSERT INTO `lead` (`first_name`, `last_name`, `mobile`, `area`, `existing_broadband`, `lead_type`, `added_by`) VALUES ("+connection.escape(req.body.first_name)+", "+connection.escape(req.body.last_name)+", "+connection.escape(req.body.mobile)+", "+connection.escape(req.body.area)+", "+connection.escape(req.body.existing_broadband)+", "+connection.escape(req.body.lead_type)+" , "+connection.escape(req.body.added_by)+")";
      connection.query(sql, function (err, result) {
        if (err) {
          res.status(200).send({
            status: "error",
            message: err,
          });
        }else{
          res.status(200).send({
            status: "success",
            message: "Data inserted"
          });
        }
      });
    }
  },

  list_data: function (req, res) {
    const errors = validationResult(req);
    if (Object.keys(errors.array()).length > 0) {
      res.status(200).send({
        status: "validation_error",
        errors: errors.array(),
        token: req.token,
      });
    } else {
       
      var where = "";

      if (req.query.start_date != "" && req.query.end_date != "" ) {
        var start_date = moment(moment(new Date(req.query.start_date))).format("YYYY/MM/DD");
        var end_date = moment(moment(new Date(req.query.end_date))).format("YYYY/MM/DD");

        if(req.query.type == 0){
          where = "WHERE DATE(creared_date) BETWEEN "+connection.escape(start_date)+" AND "+connection.escape(end_date)+" AND added_by = "+connection.escape(req.query.added_by)+" ";
        }
        
      
      }else{
        
        if(req.query.type == 0){
          where = "WHERE added_by = "+connection.escape(req.query.added_by)+"  ";
        }
      }

      var CountSQL = "SELECT COUNT(*) as count FROM vw_appusers "+where;
      connection.query(CountSQL, function (err, result) {
      var count = result[0].count;
      var sql = "SELECT * FROM vw_appusers "+where+" limit "+(Number(req.query.page)*Number(req.query.limit))+", "+req.query.limit+"";;
      
      connection.query(sql, function (err, result) {
        if (err) {
          res.status(200).send({
            status: "error",
            message: err,
          });
          }else{
            var sql = "SELECT * FROM `lead` "+where;
            connection.query(sql, function (err, result2) {
              if (err) {
                res.status(200).send({
                  status: "error",
                  message: err,
                });
                }else{
      
                  res.status(200).send({
                    status: "success",
                    result: result,
                    mock_result: result2,
                    totalCount: count
                  });
                  
                }
              });

          }
        });
      });


   }
  },
};
