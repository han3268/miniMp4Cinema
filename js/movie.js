$(function(){
  $(".tags .tag a").click(function(event){
    event.preventDefault();
    var getreq = window.location.search//获取地址栏的 req
    getreq = decodeURI(getreq)//url解码

    //解析地址栏的url的req 保存到不同变量
    var getreqs= getreq.split("&")//分割内容 
    var year  =   getreqs[0]===undefined?"year=all":getreqs[0] //如果没有那么就等于all
    var rating =  getreqs[1]===undefined?"rating=all":getreqs[1]
    var country = getreqs[2]===undefined?"country=all":getreqs[2]
    var tag =     getreqs[3]===undefined?"tag=all":getreqs[3]
    // console.log(year)

    var gethref= $(this).attr("href").split("?")[1]//获取点击的url的req
    if(gethref.search("year")!=-1){//找到对应的 变量然后写入
      year = "?"+gethref//第一个要加问号
    }else if(gethref.search("rating")!=-1){
      rating = gethref
    }else if(gethref.search("country")!=-1){
      country = gethref
    }else if(gethref.search("tag")!=-1){
      tag = gethref
    }

    getreq =`${year}&${rating}&${country}&${tag}`
    //window.location.href="./movie.html" + getreq
    console.log(getreq)
    //不刷新静态加载

  }).removeClass("active")//移除以前的class
  
  function mreq(v){
    if(v==""||v===undefined){v="?year=all&rating=all&country=all&tag=all"}
    $.ajax({
      url:`http://localhost:8080/movie`+v,
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
  }
  mreq();

})
