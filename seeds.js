const mongoose = require("mongoose"),
     blogsModel =require("./models/blogs"),
     comments  = require("./models/comments");
    
     
     var data =[
        {name:"Salman Creek",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Granite Hill",image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Mountain Goat's Rest",image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Salman Creek",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Granite Hill",image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Mountain Goat's Rest",image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Salman Creek",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Granite Hill",image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg"},
        {name:"Mountain Goat's Rest",image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Salman Creek",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Granite Hill",image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        {name:"Mountain Goat's Rest",image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",description:"this is a hill campgrounds which is better than others campgrounds"},
        ];
        
    function seedsDB(){
    
     blogsModel.remove({},(err)=>{
        if(err){
            console.log("error is :",err);
        }else{
            console.log("data is removed");
            comments.remove({},(err)=>{
                if(err){
                console.log(err);
            }
            console.log("removed comments!");
               //add a few campgrounds
          data.forEach(element=>{
           blogsModel.create(element,(err,data)=>{
          if(err){
              console.log("error is :",err);
          }else{
              console.log("adding data is ",data);
              comments.create({
                  text:"this is a comments block",
                  author:"naruto"
              },(err,comment)=>{
                  if(err){
                      console.log("error is :"+err);
                  }else{
                      data.comments.push(comment);
                      data.save();
                      console.log("comments is created");
                  }
              });
          }
         });
      });           
            });
         
    }
}); 
            
    }
    
    module.exports= seedsDB;