$(function(){
  $.ajax({
    url:"./header.html",
    type:"get",
    success:function(res){
      //动态添加<link>到<head>元素中，自动引入header.css
      // $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
      //用接收到的片段代替页面上空的<header>
      $(res).replaceAll("#header");   

      var atURL = window.location.pathname//获取地址栏的URl
      var atURL = substr(atURL)//正则过滤 获取html 名字

      var navs = $(".navbar ul>li a")
      for(var item of  navs ){
        var presentURL =substr($(item).attr("href"))//获取ul>li>a的URL
        if( atURL == presentURL ){
          $(item).parent().addClass("active")//父元素 li  class="active" 
        }
      }

      $(".search-box").on("click",function(e){
        e.preventDefault()
        //console.log("编辑框")
      })
 

      $(".search-but").click(function(event){
        event.preventDefault();
        var q =  $(".search-box").val()
        window.location.href="./search.html?q=" + q
      });
    }
  })

 function substr(url){
  var substr = url.match(/\/(\S*).htm/);
  return substr[1]
 }

})


