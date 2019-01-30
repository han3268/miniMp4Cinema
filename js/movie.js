
$.ajax({
  url:"http://localhost:8080/movie",
  type:"get",
  success:function(res){
    //console.log(res.data)
    var list =res.data 
    var htmlBox = ""
    for(var item of list ){
      var html = `
      <div class="movie-item ">
        <div class="movie-item-box">
          <div class="movie-img">
            <a href="./details.html?vid=${item.vid}"><div class="movie-show"><img src="./img/movie/0a_player.png"></div></a>
            <img src="${item.img_url}" alt="">
          </div>
          <div class="meta">
            <a href="${item.vid}">${item.vname}</a>
            <div>类型:${item.type}</div>
          </div>
        </div>
      </div>`
      htmlBox += html
    }
   //console.log(htmlBox)
   htmlBox=`<div class="movie-box">${htmlBox}</div>`
    $(htmlBox).replaceAll(".movie-box");  //替换   
  }
}) 