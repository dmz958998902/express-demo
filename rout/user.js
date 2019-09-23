const express=require("express");
const UserModel=require("../model/cuser");
const bcryptjs=require("bcryptjs");
const router=express.Router();
//跳转注册页面
router.get("/register",(req,res)=>{
   res.render("register");
});
//注册路由的一系列操作
router.post("/store",async(req,res)=>{
    //获取注册过程中form表单的数据
    // console.log(req.body);
    let username=req.body.username;
    let email=req.body.email;
    let password=req.body.password;
    //对参数进行校验
    if(!username||!email||!password){
        res.send("参数有误");
        return;
    }
    let data= await UserModel.findOne({email:req.body.email});
    console.log(data)
    if(data){
        //已经注册过了
        res.send("已经注册过了")
    }else{
        let reg=new UserModel({
            username:req.body.username,
            email:req.body.email,
            password:bcryptjs.hashSync(req.body.password)
        });
        await reg.save();
        res.send("注册成功");
    }
//     UserModel.findOne({email:req.body.email}).then(dat=>{
//         console.log(dat)
//         if(dat){
//             res.send("已经注册过了")
//         }else{
//  //将数据存到数据库中
//     const data=new UserModel({
//         username:username,
//         email:email,
//         password:password
//     });
//     data.save().then(()=>{
//         res.send("注册成功")
//     }).catch(()=>{
//         res.send("注册失败");
//     })
//         }
//     })
})

//登录页面
router.get("/login",(req,res)=>{
    res.render("login.ejs");
})

//登录操作
router.post("/login",async(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    if(!email||!password){
        res.send("请输入邮箱或密码");
        return;
    }
    //由于数据库的密码是加密了的，所有我们用邮箱去查询
    let data=await UserModel.findOne({email:email});
    console.log(data);
    if(!data){
        res.send("邮箱或密码错误，请重新登录");
        return
    }
    let isok= bcryptjs.compareSync(password,data.password);
    if(!isok){
        res.send("邮箱或错误请重新登录");
        return;
    }
    //登陆成功给session添加东西
    req.session.user=data;
    res.redirect("/posts");
})
module.exports=router