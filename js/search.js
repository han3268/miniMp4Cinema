
$(function(){
  var urlobj = new URLSearchParams(location.search);
  var q = urlobj.get("q");
  // console.log(q)

  if(isNaN(q)||q<1 || q===undefined ||q===null  ){
    //跳转到首页
    
  }
  $.ajax({
    url:"http://localhost:8080/search?q="+q,
    type:"get",
    success:function(res){
      var lists = []
      //seekvname  seekdirector  seekprotagonist
      //需要合并这个数组
      lists = lists.concat(res.data.seekvname,res.data.seekdirector,res.data.seekprotagonist)
      console.log(lists)

      var htmlBox=``
      for(var item of lists){
        var protagonistHtml =  ``
        var protagonists = item.protagonist.split(",")	

        for(var key of protagonists ){
          protagonistHtml +=`<a target="_blank" href="./search.html?q=${key}">${key}</a>`
        }

        var html=`
        <div class="d-flex searchList">
          <div class="col-2 thumbnail">
            <img  src="${item.img_url}" >
          </div>
          <div class="col-8 info">
            <div class="">
              <a class="font-weight-bold" href="./details.html?vid=${item.vid}">${item.vname} <span>${item.rating}分</span></a>
              <ul>
                <li>导演：<a target="_blank" href="/search.html?q=${item.director}">${item.director}</a></li>
                <li>主演：${protagonistHtml}</li>
                <li>上映日期：${item.releaseDate}</li>
                <li class="intro">简介：${item.vintro}</li>
              </ul>
            </div>
          </div>
          <div class="col-2 graded">
          </div>
        </div>`
        htmlBox+=html
      }
      if(lists.length>1){
        $("section.section").html(htmlBox); //替换 
      }
    }
  })
  $.ajax({//猜喜欢
    url:"http://localhost:8080/search/GuessLike",
    type:"get",
    success:function(res){
      //console.log(res.data)
      var list =res.data 
      $(".latelySearch .movie-box").append(videoItem(list)); //替换 
    }
  })

})
