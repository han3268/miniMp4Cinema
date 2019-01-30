

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
            <span>1</span>
          </div>
          <div class="col-9 intro">
            <div class="d-flex">
              <div class="col-2"><img  src="./img/movie/ir6fovuyodyc.jpg" ></div>
              <a href="#"><div>肖申克的救赎 <span> The Shawshank Redemption</span></div>
                <p>20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。未过多久，安迪尝试接近囚犯中颇有声望的瑞德（摩根·弗里曼 Morgan Freeman 饰），请求对方帮自己搞来小锤子。以此为契机，二人逐渐熟稔，安迪也仿佛在鱼龙混杂、罪恶横生、黑白混淆的牢狱中找到属于自己的求生之道。他利用自身的专业知识，帮助监狱管理层逃税、洗黑钱，同时凭借与瑞德的交往在犯人中间也渐渐受到礼遇。表面看来，他已如瑞德那样对那堵高墙从憎恨转变为处之泰然，但是对自由的渴望仍促使他朝着心中的希望和目标前进。而关于其罪行的真相，似乎更使这一切朝前推进了一步……
                  本片根据著名作家斯蒂芬·金（Stephen Edwin King）的原著改编。</p></a>
            </div>
          </div>
          <div class="col-2 graded">
            <span>9.5</span>
          </div>
        </div>`
        htmlBox += html
      }
      $(".paging").before(htmlBox); //替换 
    }
  })
})