
$.ajax({
  url:"./footer.html",
  type:"get",
  success:function(res){
    //动态添加<link>到<head>元素中，自动引入header.css
    //  $("<link rel='stylesheet' href='./css/forgot.css'>").appendTo("head");
    //用接收到的片段代替页面上空的<header>
    $(res).replaceAll(".footer");   
    //console.log(res)
  }
})