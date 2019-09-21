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
    let list=await PostModel.find()
    .sort({updatedAt:-1})
    .skip((pageNum-1)*pageSize)
    .limit(pageSize);
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
    // res.send("新增文章");
    res.redirect("/posts");//直接跳转你想去的页面
})

//文章详情页面
router.get("/:id",async (req,res)=>{
    //动态获取文章的ID，不能用req.query（这个获取的是静态的）
    let id=req.params.id;
    //根据ID区数据库找文章
    let data= await PostModel.findById(id);
    //console.log(data);
    //将data数据渲染出去
    res.render("showxq.ejs",{
        information:data
    });
})
//文章编辑页面
router.get("/:id/edit",async(req,res)=>{
    let id=req.params.id;
    let data= await PostModel.findById(id)
    res.render("edit.ejs",{
        title:data.title,
        content:data.content,
        ID:data._id//这个id  是给下面的修改内容用的
    })
})
//修改页面内容
router.post("/update",async(req,res)=>{
    //获取id 在ejs中设置一个隐藏的input框保存id
    let id=req.body.id;
    let title=req.body.title
    let content=req.body.content
    let data=await PostModel.updateOne({_id:id},{
        title:title,
        content:content
    });
    res.send("修改成功")
})
module.exports=router