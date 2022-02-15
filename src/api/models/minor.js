const mongoose = require('mongoose');
const minorSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: true,
  },
  prenom: {
    type: String,
    trim: true,
    required: true,
  },
  cne: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  chronic_disease: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    trim: true,
    required: true,
  },
  rdv:{
    type:Date,
    required:true,
  },
  dose1:{
    type:Boolean,
    default:false,
  },
  dose2:{
    type:Boolean,
    default:false,
  },
  dose3:{
    type:Boolean,
    default:false,
  },
  hashed_password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
},{collection:"minors"});
module.exports = mongoose.model('Minor',minorSchema);