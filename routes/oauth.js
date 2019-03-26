const oauthRoutes = require("express").Router(),
       passport  =require("passport"),
        User     = require("../models/user");


oauthRoutes.get("/",(req,res)=>{
    res.render("landing");
});

//=======
//register routes
//=======
oauthRoutes.get("/register",(req,res)=>{
    res.render("authentication/register");
});

oauthRoutes.post("/register",(req,res)=>{
    
    var newUser =new User({username:req.body.username});
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            console.log("error is:",err);
            req.flash("error",err.message);
            res.render('authentication/register');
        }
        passport.authenticate("local")(req,res,()=>{
            req.flash("success","Welcome to DevBlog "+user.username);
            res.redirect('/blogs');
        });
    });
});

//=======
//login
//=======

oauthRoutes.get("/login",(req,res)=>{
   res.render("authentication/login");
});

oauthRoutes.post("/login",passport.authenticate("local",{
    successRedirect:"/blogs",
    failureRedirect:"/login",
}),(req,res)=>{
    

});

oauthRoutes.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Logged You Out!");
    res.redirect("/");
});

module.exports = oauthRoutes;