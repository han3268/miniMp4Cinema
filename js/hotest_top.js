$(function(){
  var urlobj = new URLSearchParams(location.search);
  var page = urlobj.get("page");
  page = parseInt(page)
 
  if(isNaN(page)||page<0 || page>4 || page===undefined ||page===null  ){
    page = 0
  }
  $(`.paging ul.pagination li:eq(${page})`).addClass("active")


  $.ajax({
    url:"http://localhost:8080/hotest_top?page=" + page,
    type:"get",
    success:function(res){   
      //console.log(res)
      resData=res.data
      var htmlBox=``

      var css=  ``
      for(var item of resData){
        if(item.vrank==1){
          css=`style="background:#FBAD68"`
        }else if(item.vrank==2){
          css=`style="background:#A7C87F"`
        }else if(item.vrank==3){
          css=`style="background:#66B3D6"`
        }else{
          css=``
        }
        if(item.vrating==0){//如果没有评分就N/A
          item.vrating="N/A"
        }
        var protagonist =  ``
        var protagonists = item.protagonist.split(",")	
        for(var key of protagonists ){
          protagonist +=`<a target="_blank" href="./search.html?q=${key}">${key}</a>`
        }
        var html=`
        <div class="d-flex doubanList">
          <div class="col-1 top">
            <span ${css}>${item.vrank}</span>
          </div>
          <div class="col-9 intro">
            <div class="d-flex">
              <div class="col-2"><img src="${item.vimg_url}" ></div>
              <div class="col-10">
                <a href="./search.html?q=${item.vname}">${item.vname} <span>${item.valias}</span></a>
                <ul>
                  <li>导演：<a target="_blank" href="./search.html?q=${item.director}">${item.director}</a></li>
                  <li>主演：${protagonist}</li>
                  <li>上映日期：${item.releaseDate}</li>
                  <li><span>今日排名无变化</span><span>昨日排名：${item.yesterdaytop}</span><span>历史最高排名：${item.historytop}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-2 graded">
            <span>${item.vrating}</span>
          </div>
        </div>`
        htmlBox += html
      }
      
       $(".paging").before(htmlBox); //替换 
    }
  })

})