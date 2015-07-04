var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email:String,
  isActive:Boolean,
});

var User = mongoose.model('User', userSchema);
module.exports = User;
