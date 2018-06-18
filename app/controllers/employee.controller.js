const logger = require('../_log/logger_def.js');
const crypto = require('crypto');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

const Employee = require('../models/employee.model');

exports.list = function(req, res){
  Employee.find({
    "location": req.query.location.toUpperCase(),
    "date": standardizeDate(req.query.date)
  }).then((employees)=>{
    res.send(employees)
  }).catch((err)=>{
    logger.error("No employees found");
    res.sendStatus(500);
  })
}

exports.create = function(req, res){
  var employeeInstance = req.body;
  employeeInstance.date = standardizeDate(req.body.inTime);
  employeeInstance.activity = [
    {
      "type": "in",
      "time": req.body.inTime
    }
  ]
  var newEmployee = new Employee(employeeInstance);
  newEmployee.save()
  .then((employee)=>{
    res.status(200).send(employee)
  }).catch((err)=>{
    logger.error("Could not create entry");
    res.sendStatus(500)
  })
};

exports.find = function (req, res) {
  (()=>{
    if (req.query.date) {
      return Employee.findOne({
        "empId": req.params.emp_id,
        "date": standardizeDate(req.query.date)
      })
    }else{
      return Employee.find({
        "empId": req.params.emp_id
      })
    }
  })()
  .then((employee)=>{
    employee.length < 1 ? res.sendStatus(404) : res.send(employee);
  }).catch((err)=>{
    logger.error("Could not find that employee");
    res.sendStatus(404)
  })
};

exports.checkIn = function (req, res) {
  var updateData = {
    "inOffice" : true,
    $push: {activity: {
      "type" : "in",
      "time" : req.body.time
    }}
  }
  exports.updateEmployeeEntry(req.params.emp_id, updateData)
  .then((employee) => {
    res.send("updated");
  }).catch((err)=>{
    logger.error("No employee found for those parameters");
    res.sendStatus(404);
  })
};

exports.checkOut = function (req, res) {
  var updateData = {
    "inOffice" : false,
    $push: {activity: {
      "type" : "out",
      "time" : req.body.time
    }}
  }
  exports.updateEmployeeEntry(req.params.emp_id, updateData)
  .then((employee) => {
    res.send("updated");
  }).catch((err)=>{
    logger.error("No employee found for those parameters");
    res.sendStatus(404);
  })
};

exports.lunchIn = function (req, res) {
  logger.info("lunch in time : " + req.body.time)
  var updateData = {
    "inOffice" : true,
    "lunchInTime" : req.body.time
  }
  exports.updateEmployeeEntry(req.params.emp_id, updateData)
  .then((employee) => {
    res.send("updated");
  }).catch((err)=>{
    logger.error("No employee found for those parameters");
    res.sendStatus(404);
  })
};

exports.lunchOut = function (req, res) {
  logger.info("lunch out time : " + req.body.time)
  var updateData = {
    "inOffice" : false,
    "lunchOutTime" : req.body.time
  }
  exports.updateEmployeeEntry(req.params.emp_id, updateData)
  .then((employee) => {
    res.send("updated");
  }).catch((err)=>{
    logger.error("No employee found for those parameters");
    res.sendStatus(404);
  })
};


function standardizeDate(date){
  if (date) return new Date(date.substr(0,10)).toUTCString();
  else{
    var date = new Date().toISOString();
    console.log(date);
    return new Date(date.substr(0,10)).toUTCString();
  }
}

exports.updateEmployeeEntry = function(empId, data){
  return Employee.findOneAndUpdate(
    {
      "empId" : empId,
      "date": standardizeDate()
    },
    data,
    {'new':true}
  )
}
