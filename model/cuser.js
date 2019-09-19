

//user 表的model文件
//1.  引入mongoose，是已经链接了mongodb的mongoose
const mongoose=require("../config/db")
const schema=new mongoose.Schema({
    //表的数据结构描述
    username:String,
    email:String,
    password:String
})
// 生成model
const model=mongoose.model("user",schema);
//暴露model
module.exports=model;
