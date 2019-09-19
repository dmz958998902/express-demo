//用来做mongoose链接的

//1. 引入mongoose
const mongoose=require("mongoose");
//2.定义一个mongodb的链接地址
const url="mongodb://127.0.0.1:27017/express"
//3.使用mongoose模块的connect（）去链接
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    console.log("数据库连接成功")
}).catch(error=>{
    console.log("数据库连接失败");
    console.log(error)
});
//4.将mongoose暴露出去
module.exports=mongoose;
