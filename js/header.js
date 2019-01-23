$(function(){
  $.ajax({
    url:"../header.html",
    type:"get",
    success:function(res){
      //动态添加<link>到<head>元素中，自动引入header.css
      $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
      //用接收到的片段代替页面上空的<header>
      //<header>
      $(res).replaceAll("#header");
      console.log(res)
    }
  })
})