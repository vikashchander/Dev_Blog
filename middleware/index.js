var blogs = require("../models/blogs");
var Comment = require("../models/comments");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.giveBlogAuthorization= (req, res, next)=> {
 if(req.isAuthenticated()){
        blogs.findById(req.params.id, (err, foundBlogs)=>{
           if(err){
               req.flash("error", "blogs not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundBlogs.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.giveCommentsAuthorization = (req, res, next)=> {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;