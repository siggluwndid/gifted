// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    default: "익명"
  },
  email: { 
    type: String, 
    required: true, 
    trim: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);