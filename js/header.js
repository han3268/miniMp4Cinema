
$.ajax({
  url:"../header.html",
  type:"get",
  success:function(res){
    //动态添加<link>到<head>元素中，自动引入header.css
    // $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    //用接收到的片段代替页面上空的<header>
    $(res).replaceAll("#header");   
  }
})

function searchBut(e){
  e.preventDefault();
  console.log($('.mynav ul>li'))
}
console.log($('.search-box')[0])



$('.search-box').focus(function(){
  console.log($('.mynav ul>li'))
})


$(".search-but").on("click",function(e){
  e.preventDefault()
  console.log($('.mynav ul>li'))
})
$(".search-but").click(function(event){
  event.preventDefault();
});