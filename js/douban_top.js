$(function(){
  var urlobj = new URLSearchParams(location.search);
  var page = urlobj.get("page");
  page = parseInt(page)
  
  if(isNaN(page)||page<1 || page>10 || page===undefined ||page===null  ){
    page = 1
  }
  //$(`.paging ul.pagination li:eq(${page})`).addClass("active")
  $.ajax({
    url:"http://localhost:8080/douban_top?page=" + page,
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
        var pf= item.vrating.toString()//给没有9 的评分 加 .0   //.search("字符")	不行  .search(/./)不行  .match(/./)不行
    
        if(pf.indexOf(".",0) == -1){
          item.vrating+=".0"
        }

        var html=`
        <div class="d-flex doubanList">
          <div class="col-1 top">
            <span ${css}>${item.vrank}</span>
          </div>
          <div class="col-9 intro">
            <div class="d-flex">
              <div class="col-2"><img  src="${item.vimg_url}" ></div>
              <a href="./search.html?q=${item.vname}"><div>${item.vname} <span>${item.valias}</span></div>
                <p>${item.vintro} </p></a>
            </div>
          </div>
          <div class="col-2 graded">
            <span>${item.vrating}</span>
          </div>
        </div>`
        htmlBox += html
      }
      $("[data-douban=data]").html(htmlBox); //替换 
      pagingHtml(res.page,res.pageCount)//公共函数 分页html
      
    }
  })
})

