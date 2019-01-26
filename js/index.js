$(".mynav-tab div img").hover(function(){/*轮播 */
  $(".mynav-tab>div>a>img").prop("src",this.src)
})



$(".search-but").click(function(e){
  e.preventDefault()
  $(this).toggleClass("d-none")
})

$(".alert-success").click(function(e){
  e.preventDefault()
  $(this).toggleClass("d-none")
})


//console.log()
//$('.search-but').html("ss")
// $(".search-but").on("click",function(e){
//   e.preventDefault()
//   console.log($('.mynav ul>li'))
// })

// $(".search-but").click(function(event){
//   event.preventDefault();
// });
