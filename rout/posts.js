const express=require("express");
const PostModel=require("../model/post");
const router=express.Router();

//文章列表
router.get("/",async (req,res)=>{
    //分页处理，从url地址获取这是第几页，煤业需要多少条
    let pageNum=parseInt(req.query.pageNum)||1;
    let pageSize=parseInt(req.query.pageSize)||5;
    let total=5
    let count=await PostModel.find().countDocuments()
    //console.log(count)
    total=Math.ceil(count/pageSize);
    let list=await PostModel.find().skip((pageNum-1)*pageSize).limit(pageSize);
    //console.log(list);//这里的list是数据库查找的所有文章
    res.render("index.ejs",{
        list:list,
        pageNum:pageNum,
        total:total
    })
})
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