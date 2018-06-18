const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var guestSchema = mongoose.Schema({
  date:{
    type: Date,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    lowercase: true,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true
  },
  purposeOfVisit:{
    type: String,
    required: true
  },
  organizerEmpId:{
    type: String,
    required: true
  },
  imageURL:{
    type: String,
    required: true
  },
  inTime:{
    type: String,
    required: true
  },
  outTime:{
    type: String,
    default: null
  },
  location:{
    type: String,
    uppercase: true,
    required: true
  }
});

module.exports = mongoose.model('Guest', guestSchema);
