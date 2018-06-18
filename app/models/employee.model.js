const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var empSchema = mongoose.Schema({
  empId:{
    type: String,
    lowercase: true,
    required: true
  },
  empName:{
    type: String,
    required: true
  },
  imageURL:{
    type: String,
    default: ""
  },
  location:{
    type: String,
    uppercase: true,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  lunchOutTime:{
    type: String,
    default: null
  },
  lunchInTime:{
    type: String,
    default: null
  },
  inOffice:{
    type: Boolean,
    default: true
  },
  activity: []
});

module.exports = mongoose.model('Employee', empSchema);
