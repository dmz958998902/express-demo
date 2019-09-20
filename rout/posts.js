const express=require("express");
const PostModel=require("../model/post");
const router=express.Router();
router.get("/create",(req,res)=>{
    res.render("createpost.ejs");
})

router.post("/store",async(req,res)=>{
    if(!req.body.title||!req.body.content){
        res.send("添加文章失败");
        return
    }
    //将文章存到数据库
    let newPost=new PostModel({
        title:req.body.title,
        content:req.body.content
    });
    await newPost.save();
    res.send("新增文章");
})
module.exports=router