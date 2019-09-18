//引入express
const express=require("express");
//router实例化
const router=express.Router();
//在当前这个路由实例上加路由代码
// router.get("/",(req,res)=>{
//     res.send("文章列表");
// })
router.get("/",(req,res)=>{
    res.render("post/index1",{
        posts:[
            {
                title:"你猜啊",
                content:"biubiubiubiu",
                date:"2019-9-20",
                name:"张麻子"
            },
            {
                title:"你猜啊",
                content:"biubiubiubiu",
                date:"2019-9-20",
                name:"张麻子"
            },{
                title:"你猜啊",
                content:"biubiubiubiu",
                date:"2019-9-20",
                name:"张麻子"
            },{
                title:"你猜啊",
                content:"biubiubiubiu",
                date:"2019-9-20",
                name:"张麻子"
            }
        ],
         isLogin:true
    });
})
router.post("/",(req,res)=>{
    res.send("新增文章");
})
router.delete("/:id",(req,res)=>{
    res.send("删除某个文章");
})
router.get("/:id/edit",(req,res)=>{
    res.send("对某篇文章");
})
//将当前路由实例导出
module.exports=router;