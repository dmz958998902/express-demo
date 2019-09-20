//做文章表
//引入mongoose
const mongoose=require("../config/db.js");

const schema=new mongoose.Schema(
    //文章结构的描述
    {
        title:String,
        content:String
    },
    {//这个选项可以让每篇文章都会自动携带有创建时间与更新时间两个字段
        timestamps:true
    }
)
//生成model
const model=mongoose.model("post",schema);
//导出model
module.exports=model;