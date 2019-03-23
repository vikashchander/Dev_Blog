const express = require("express"),
    bodyParser = require("body-parser"),
    flash   =    require("connect-flash"),
    methodOverride = require("method-override"),
    config      = require("./utils/config").dbConfig,
    mongoose = require("mongoose"),
    app = express(),
    passport      = require("passport"),
    localStrategy  = require("passport-local"),
    User     = require("./models/user");
         
//=======
//Routes
//=======

const oauthRoutes = require("./routes/oauth"),
     commentsRoutes = require("./routes/comments"),
     blogsRoutes = require("./routes/blogs");

 //connect to the mongoose DataBase
 mongoose.connect(config,{useNewUrlParser:true},()=>{
    console.log("connect to the database");
})
 
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride('_method'));
app.use(flash());


app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
      res.locals.currentUser = req.user;
      res.locals.error   = req.flash("error");
      res.locals.success = req.flash("success"),
      next();
});




app.use('/',oauthRoutes);
app.use('/blogs',blogsRoutes);
app.use('/blogs/:id/comments',commentsRoutes);


app.listen(process.env.PORT||1234, ()=>{
    console.log("devBlog server started");
});