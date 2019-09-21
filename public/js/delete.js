$(function(){
    $("#delete").click(function(){
        var id=$(this).data("id");
        var url="/posts/"+id;
        console.log(id);
        $.ajax({
            url:url,
            method:"delete",
            success:function(res){
                if(res.code==1){
                    alert("删除成功")
                }
                location.href="/posts";
            },
            error:function(){
                alert("0")
            }
        })
    })
})