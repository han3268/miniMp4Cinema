$(function(){
  
  $($(".input-box input")[0]).on("blur",function(){//昵称
    existsEmail($(".input-box input")[0].value)
  })
  
  $($(".input-box input")[1]).on("blur",function(){//邮箱
    existsUser($(".input-box input")[1].value)
  })
  var verify =false//验证是否可以注册
  $($(".input-box input")[3]).on("blur",function(){//确认密码
    if($(".input-box input")[2].value=="" ||$(".input-box input")[2].value != $(".input-box input")[3].value){
      $(".form-box h6").html("确认密码不一致")
      verify=false
    }else{
      $(".form-box h6").html("")
      verify=true
    }
    var reg = /^\s+|\s+$/gm
    if (reg.test($(".input-box input")[3].value)) {
      $(".form-box h6").html("密码前后不能有空格") 
    }

  })
  $("button.btn").click(function(){
    if(verify){
      register($(".input-box input")[1].value,$(".input-box input")[3].value,$(".input-box input")[0].value)
    }else{
      alert("信息填写错误，请检查！")
    }
  })
  
  function existsEmail(Email){
    $.ajax({//想看
      url:"http://127.0.0.1:8080/register/existsEmail?email=" + Email ,
      type:"get",
      success:function(res){
        //console.log(res)
        if(res.code==-1){
          verify=false
        }else{
          verify=true
        }
        $(".form-box h6").html(res.msg)
      }
    })
  }
  function existsUser(user){
    $.ajax({//想看
      url:"http://127.0.0.1:8080/register/existsUser?uname=" + user ,
      type:"get",
      success:function(res){
        //console.log(res)
        $(".form-box h6").html(res.msg)
        if(res.code==-1){
          verify=false
        }else{
          verify=true
        }
      }
    })
  }
  function register(uname,upwd,email){
    verify=false
    $.ajax({//想看
      url:"http://127.0.0.1:8080/register/"  ,
      type:"post",
      data:`uname=${uname}&upwd=${upwd}&email=${email}`,
      success:function(res){
        if(res.code==1){
          alert("注册成功，请登录！")
        }else{
          alert("注册失败，请重试！")
        }
        
      }
    })
  }

})
