const express=require("express");
const UserModel=require("../model/cuser");
const router=express.Router();
//跳转注册页面
router.get("/register",(req,res)=>{
   res.render("register");
});
//注册路由的一系列操作
router.post("/store",(req,res)=>{
    //获取注册过程中form表单的数据
    console.log(req.body);
    let username=req.body.username;
    let email=req.body.email;
    let password=req.body.password;
    //对参数进行校验
    if(!username||!email||!password){
        res.send("参数有误");
        return;
    }
    UserModel.findOne({email:req.body.email}).then(dat=>{
        console.log(dat)
        if(dat){
            res.send("已经注册过了")
        }else{
 //将数据存到数据库中
    const data=new UserModel({
        username:username,
        email:email,
        password:password
    });
    data.save().then(()=>{
        res.send("注册成功")
    }).catch(()=>{
        res.send("注册失败");
    })
        }
    })
})
module.exports=router