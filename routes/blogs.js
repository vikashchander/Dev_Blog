const blogsRoutes = require("express").Router(),
  blogsModel= require("../models/blogs"),
  middleware  = require("../middleware");
  
blogsRoutes.get("/",(req,res)=>{
    console.log(req.user);
    blogsModel.find({},(err,allBlogs)=>{
        if(err){
            console.log(err);
        }else{
           res.render("blogs/blogs",{blogs:allBlogs}); 
        }
    });
    
});

blogsRoutes.post("/",(req,res)=>{
 var name = req.body.name.toLowerCase();
 var image =req.body.image;
  var desc = req.body.description;
    var author = {
        id: req.user._id,
         username: req.user.username
    };
    
 var blogNewAddObj={name:name,image:image,description: desc, author:author};
 blogsModel.create(blogNewAddObj,(err,data)=>{
     if(err){
         console.log(err);
     }else{
          res.redirect("blogs");
     }
 });
 
}); 

blogsRoutes.get("/new",middleware.isLoggedIn,(req,res)=>{
    res.render("blogs/addNewBlogPage");
});
blogsRoutes.get("/:id",(req,res)=>{
    //console.log("req.params.id ",req.params.id);
    blogsModel.findById(req.params.id).populate("comments").exec((err,foundBlog)=>{
       if(err){
           console.log("error "+err);
       }else{
           //console.log("foundCampground :",foundCampground);
           res.render("blogs/show",{blogs:foundBlog});
        } 
    });
});

//EDIT Blog ROUTE

blogsRoutes.get("/:id/edit",middleware.giveBlogAuthorization,(req,res)=>{
   blogsModel.findById(req.params.id,(err,foundBlog)=>{
      if(err){
          console.log("error is :",err);
          res.redirect("/blogs");
      }
      else{
          res.render("../views/others/edit",{editBlog:foundBlog});
      }
   });
    
});

//Update Blog ROUTE
blogsRoutes.put("/:id",(req,res)=>{
    blogsModel.findByIdAndUpdate(req.params.id,req.body.blogs,(err,updateBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//DISTROY Blog ROUTE
blogsRoutes.delete("/:id",middleware.giveBlogAuthorization,(req,res)=>{
blogsModel.findByIdAndRemove(req.params.id,(err,removeBlogs)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});


module.exports= blogsRoutes;