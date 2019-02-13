$(function(){ //开始
  $("button.btn").click(function(){
    var email= $(".form-box [type=text]").val()
    var upwd=$(".form-box [type=password]").val()
    
    if(email==""||upwd==""||email===undefined ||upwd===undefined ){
      alert("账号或密码为空！")
    }else{
      login(email,upwd)
    }
  
  })
  function login(email,upwd){
   
    $.ajax({
      crossDomain:true, //设置跨域为true
      xhrFields: {
        withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
      },
      url: "http://localhost:8080/login",
      type: 'POST',
      data: `email=${email}&upwd=${upwd}`,
      success:function(res){
        console.log(res)
        if(res.code==1){
          console.log("登录成功")
          alert("登录成功")
          
          window.location.href="./index.html"//跳转到 header.js会自动验证
        }else{
          alert("登录失败！账号或密码错误")
        }
      }
    });
  }


})//$结束
