const express=require("express");
const cookieParser=require("cookie-parser");
const registerRouter=require("./rout/user");
const postRouter=require("./rout/posts");
const session=require("express-session")
const app=express();
//模板引擎
app.set("views","views");
app.set("view engine","ejs");
//session 中间件处理
app.use(session({
    secret:"0.0-.-",//cookie 签名
    resave:true,//是否在对session有更新操作的时候，重新给浏览器更新sessionId
    saveUninitialized:true,//是否默认初始化session
    cookie:{
        maxAge:1000*60*60*5
    }
}))
//处理静态资源托管
app.use(express.static("public"));
//处理req.body()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//处理req.cookies
app.use(cookieParser());
//处理各种路由中间件
app.use("/posts",postRouter);
app.use("/users",registerRouter);


// app.get("/",(req,res)=>{
//     res.redirect("/posts")
// })
app.listen(3000);