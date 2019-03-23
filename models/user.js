const mongoose = require("mongoose"),
     passportLocalMongoose = require("passport-local-mongoose");
     
mongoose.set('useCreateIndex', true);
     
  var userSchema = new mongoose.Schema({
      user:{type:String},
      password:{type:String}
  });   
  
  userSchema.plugin(passportLocalMongoose);
  
  var User = mongoose.model("User",userSchema);
  
  module.exports = User;