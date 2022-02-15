const mongoose = require('mongoose');
const adultSchema = new mongoose.Schema({
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
  cin: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  date_fin_cin:{
    type:Date,
    required:true,
    trim:true,
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
},{collection:"adults"});
module.exports = mongoose.model('Adult',adultSchema);