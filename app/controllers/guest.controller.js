const logger = require('../_log/logger_def.js');
const crypto = require('crypto');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

const Guest = require('../models/guest.model');

exports.list = function(req, res){
  Guest.find({
    "location": req.query.location.toUpperCase(),
    "date": standardizeDate(req.query.date)
  }).then((guests)=>{
    res.send(guests)
  }).catch((err)=>{
    logger.error("No Guests found");
    res.sendStatus(500);
  })
}

exports.create = function (req, res) {
  var guestInstance = req.body;
  guestInstance.date = standardizeDate(req.body.inTime);

  var newGuest = new Guest(req.body);
  newGuest.save()
  .then((guest)=>{
    res.status(200).send(guest)
  }).catch((err)=>{
    logger.error("Could not create entry");
    res.sendStatus(500)
  })
};

exports.checkOut = function (req, res) {
  var updateData = {
    "outTime" : req.body.time
  }
  exports.update(req.params.doc_id, updateData)
  .then((guest) => {
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

exports.update = function(docId, data){
  return Guest.findOneAndUpdate(
    {
      "_id" : docId
    },
    data,
    {'new':true}
  )
}
