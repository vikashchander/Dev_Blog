const commentsRoutes = require("express").Router({mergeParams:true}),
     blogsModel= require("../models/blogs"),
      comments   = require("../models/comments"),
       middleware  = require("../middleware");

//================
//Comments Routes
//================  



commentsRoutes.get("/new",middleware.isLoggedIn,(req,res)=>{
     blogsModel.findById(req.params.id,(err,newComment)=>{
       if(err){
           console.log("error is :",err);
       }else{
        res.render("comments/new",{comments:newComment});   
       }
    });
    
});

commentsRoutes.post("/",middleware.isLoggedIn,(req,res)=>{
     blogsModel.findById(req.params.id,(err,blogs)=>{
        if(err){
            console.log("error is :",err);
            res.redirect("/blogs");
        }else{
            comments.create(req.body.comment,(err,insertComments)=>{
                if(err){
                    console.log("error is :",err);
                }else{
                    //add author name
                    insertComments.author.id =req.user._id;
                    insertComments.author.username  =req.user.username;
                    // console.log(req.user.username);
                    // console.log("comments in comments.js :"+insertComments.author.id+" "+insertComments.author.username );
                    //save camogrounds
                    insertComments.save();
                    //add author id 
                    blogs.comments.push(insertComments);
                    blogs.save();
                    res.redirect("/blogs/"+blogs._id);
                }
            });           
        }
    });
});

//comments edit
commentsRoutes.get("/:comment_id/edit",(req,res)=>{
    console.log(req.params.comment_id);
    console.log(req.params.id);
     blogsModel.findById(req.params.comment_id,(err,edit)=>{
        if(err){
            res.redirect("back");
        }else{
            console.log(edit._id);
           res.render("../views/others/commentEdit",{blogs_id:req.params.id ,commentsEdit:edit}); 
        }
    });
});

//comments update

// commentsRoutes.put("/:comment_id",(req,res)=>{
    
// });



module.exports  = commentsRoutes;