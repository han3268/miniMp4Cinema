$(function(){ //开始
  $("button.btn").click(function(){
    var email= $(".form-box [type=text]").val()
    var upwd=$(".form-box [type=password]").val()
    
    if(email==""||upwd==""||email===undefined ||upwd===undefined ){
      alert("账号或密码错误")
    }else{
      login(email,upwd)
    }
  })
  function login(email,upwd){
    $.ajax({
      url: "http://localhost:8080/login",
      type: 'POST',
      data: `email=${email}&upwd=${upwd}`,
      success:function(res){
       // console.log(res)
        if(res.code==1){
          console.log("登录成功")
        }else{
          alert("登录失败！账号或密码错误")
        }
      }
    });
  }
})//$结束
