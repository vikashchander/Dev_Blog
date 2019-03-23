const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
      
//create schema 
var blogsSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[{
               type:mongoose.Schema.Types.ObjectId,
               ref: "comments"
    }]
});


module.exports= mongoose.model("blogs",blogsSchema);