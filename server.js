const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
//中间件调用，下面这行代码实现了给req添加了一个cookies的属性，获取cookie的数据
app.use(cookieParser());
//静态资源管理
app.use(express.static("public"));
//路由
app.get("/",(req,res)=>{//第一个参数是路径，第二个参数回调函数也是路由的处理函数
    // res.write("hello express");
    // res.end();
    res.send("hello get");//这里send是 write和end方法的结合
    console.log(req.query);
})
// app.post("/handleLogin",(req,res)=>{
//     console.log(req.body);
//     res.send("hello post");
// });
app.get("/setcookie",(req,res)=>{
    res.cookie("uname","123",{
       maxAge:1000*60*10
    })
    res.send("cookie设置成功");
});
app.get("/getcookie",(req,res)=>{
    console.log(req.cookies)
    res.send("获取cookie");
})
//app.params 获取路由的parameter动态参数
app.get("/hello/:id",(req,res)=>{
    console.log(req.params);
    res.send("哈哈哈哈哈哈");
})

app.listen(3000);