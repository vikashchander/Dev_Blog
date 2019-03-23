const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);


var commentsSchema = new mongoose.Schema({
    text:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:{type:String}
    }
    
});

module.exports = mongoose.model("comments",commentsSchema);