$.ajax({
  url:"http://localhost:8080/index/navimg",
  type:"get",
  success:function(res){
    //用接收到的片段代替原来的
   
    //console.log(res.data)
    var resdata =res.data 
    var html = 
    `<div class="row mynav-tab">
      <div class="col-8 pr-0">
        <a href="./details.html?vid=${resdata[0].Movies_url}"><img src="${resdata[0].img_url}" title="${resdata[0].vname}" alt="${resdata[0].vname}"></a>
      </div>
      <div class="col-4 p-0 ">
        <div class="col-12 "><a href="./details.html?vid=${resdata[0].Movies_url}"><img src="${resdata[0].img_url}" title="${resdata[0].vname}" alt="${resdata[0].vname}"></a></div>
        <div class="mynav-tabs row">
          <div class="col-6"><a href="./details.html?vid=${resdata[1].Movies_url}"><img src="${resdata[1].img_url}" title="${resdata[1].vname}" alt="${resdata[1].vname}"></a></div>
          <div class="col-6"><a href="./details.html?vid=${resdata[2].Movies_url}"><img src="${resdata[2].img_url}" title="${resdata[2].vname}" alt="${resdata[2].vname}"></a></div>
          <div class="col-6"><a href="./details.html?vid=${resdata[3].Movies_url}"><img src="${resdata[3].img_url}" title="${resdata[3].vname}" alt="${resdata[3].vname}"></a></div>
          <div class="col-6"><a href="./details.html?vid=${resdata[4].Movies_url}"><img src="${resdata[4].img_url}" title="${resdata[4].vname}" alt="${resdata[4].vname}"></a></div>
        </div>
      </div>
    </div>`
    $(html).replaceAll(".mynav-tab"); //替换 
    //替换完成后
    $(".mynav-tab div img").hover(function(){/*替换大图*/
      $(".mynav-tab>div>a>img").prop("src",this.src).prop("title",this.title)
    })
  }
})

$.ajax({
  url:"http://localhost:8080/index/indexF1",
  type:"get",
  success:function(res){
    //console.log(res.data)
    var list =res.data 
    var htmlBox = ""
    for(var item of list ){
      var html = `
      <div class="movie-item ">
        <div class="movie-item-box" title="${item.vname}"  >
          <div class="movie-img">
            <a href="./details.html?vid=${item.vid}"><div class="movie-show"><img src="./img/movie/0a_player.png"></div></a>
            <img src="${item.img_url}" alt="">
          </div>
          <div class="meta">
            <a href="./details.html?vid=${item.vid}">${item.vname}<span>--${item.rating}分</span></a>
            <div>类型:${item.type}</div>
          </div>
        </div>
      </div>`
      htmlBox += html
      
    }
   //console.log(htmlBox)
    $(".indexF1 .movie-box").append(htmlBox); //替换 
  }
})

$.ajax({
  url:"http://localhost:8080/index/indexF2",
  type:"get",
  success:function(res){
    //console.log(res.data)
    var list =res.data 
    var htmlBox = ""
    for(var item of list ){
      var html = `
      <div class="movie-item ">
        <div class="movie-item-box"  title="${item.vname}" >
          <div class="movie-img">
            <a href="./details.html?vid=${item.vid}"><div class="movie-show"><img src="./img/movie/0a_player.png"></div></a>
            <img src="${item.img_url}" alt="">
          </div>
          <div class="meta">
          <a href="./details.html?vid=${item.vid}">${item.vname}<span>--${item.rating}分</span></a>
            <div>类型:${item.type}</div>
          </div>
        </div>
      </div>`
      htmlBox += html
      
    }
   //console.log(htmlBox)
    $(".indexF2 .movie-box").append(htmlBox); //替换 
  }
})

$.ajax({
  url:"http://localhost:8080/index/indexF3",
  type:"get",
  success:function(res){
    //console.log(res.data)
    var list =res.data 
    var htmlBox = ""
    for(var item of list ){
      var html = `
      <div class="movie-item ">
        <div class="movie-item-box"  title="${item.vname}" >
          <div class="movie-img">
            <a href="./details.html?vid=${item.vid}"><div class="movie-show"><img src="./img/movie/0a_player.png"></div></a>
            <img src="${item.img_url}" alt="">
          </div>
          <div class="meta">
          <a href="./details.html?vid=${item.vid}">${item.vname}<span>--${item.rating}分</span></a>
            <div>类型:${item.type}</div>
          </div>
        </div>
      </div>`
      htmlBox += html
    }
   //console.log(htmlBox)
    $(".indexF3 .movie-box").append(htmlBox); //替换 
  }
}) 
$.ajax({
  url:"http://localhost:8080/index/indexF4",
  type:"get",
  success:function(res){
    //console.log(res.data)
    var list =res.data 
    var htmlBox = ""
    for(var item of list ){
      var html = `
      <div class="movie-item ">
        <div class="movie-item-box"  title="${item.vname}" >
          <div class="movie-img">
            <a href="./details.html?vid=${item.vid}"><div class="movie-show"><img src="./img/movie/0a_player.png"></div></a>
            <img src="${item.img_url}" alt="">
          </div>
          <div class="meta">
            <a href="./details.html?vid=${item.vid}">${item.vname}<span>--${item.rating}分</span></a>
            <div>类型:${item.type}</div>
          </div>
        </div>
      </div>`
      htmlBox += html
    }
   //console.log(htmlBox)
    $(".indexF4 .movie-box").append(htmlBox); //替换 
  }
}) 

$.ajax({
  url:"http://localhost:8080/index/doubanRightBox",
  type:"get",
  success:function(res){
    //console.log(res.data)
    var list =res.data 
    var htmlBox = ""
    var css=""
    var i=0;
    for(var item of list ){
      if(i<3){
        css=`style="background:red"`
      }else{
        css=""
      }
      var html = `
      <a href="./search.html?q=${item.vname}"><span ${css}>${i+1}</span>${item.vname}</a>
      `
      htmlBox += html
      i++
    }
   //console.log(htmlBox)
    $("[data-rightBox=doubanTop]").append(htmlBox); //加入
  }
}) 
$.ajax({
  url:"http://localhost:8080/index/choiceness",
  type:"get",
  success:function(res){
    //console.log(res.data)
    var list =res.data 
    var htmlBox = ""
    var css=""
    var i=0;
    for(var item of list ){
      
      if(i<3){
        css=`style="background:red"`
      }else{
        css=""
      }
      var html = `
      <a href="./details.html?vid=${item.vid}"><span ${css}>${i+1}</span>${item.vname}</a>
      `
      htmlBox += html
      i++
    }
   //console.log(htmlBox)
    $("[data-rightBox=choiceness]").append(htmlBox); //加入
  }
}) 
