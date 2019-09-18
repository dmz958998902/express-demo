const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("文章列表");
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
module.exports=router;