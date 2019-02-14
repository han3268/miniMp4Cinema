$(function(){
  $("button.btn").click(function(){
    var u = $("input.form-control").val()
    console.log(u)
    if(u==""||u.length>3){
      alert("请输入正确的内容！")
    }
    $.ajax({
      url:"http://127.0.0.1:8080/forgot?u=" + u,
      type:"get",
      success:function(res){
        // console.log(res)
        alert(res.msg)
      }
    })
  })

})