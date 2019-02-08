$(function(){
  var urlobj = new URLSearchParams(location.search);
  var vid = urlobj.get("vid");
  vid = parseInt(vid)
  if(isNaN(vid)||vid<1 || vid===undefined ||vid===null  ){
    //跳转到首页
    window.location.href="./index.html"
  }
  //$(`.paging ul.pagination li:eq(${vid})`).addClass("active")
  $.ajax({
    url:"http://127.0.0.1:8080/details?vid=" + vid,
    type:"get",
    success:function(res){   
      var product=res.product//影片详情 对象
      var episodeList = res.episodeList//剧集数组
      var guessLike = res.guessLike//猜你喜欢
      // var pf= product.vrating.toString()//给没有9 的评分 加 .0   //.search("字符")	不行  .search(/./)不行  .match(/./)不行
      // if(pf.indexOf(".",0) == -1){
      //   product.vrating+=".0"
      // }

      var valias = product.valias.split(",")//数据库的别名很多 多数英语别名是最后一个 取最后一个数组
      if(valias.length>1){//多于的加入备注
        product.valias=valias[valias.length-1]
      }

      var html=`
        <div class="d-flex">
          <div class="col-4">
            <div class="Infoimg"><img src="${product.img_url}" alt=""></div>
          </div>
          <div class="col-8 pl-0">
            <div class="intro">
              <h3>${product.vname}<span>${product.valias}</span></h3>
              <span>${product.rating}</span>
              <ul>
                <li>上映时间：${teimFormat(product.releaseDate,0)}</li>
                <li>影片时长：${product.vmins} Min</li>
                <li>导演：${product.director}</li>
                <li>主演：${product.protagonist}</li>
                <li>类型：${product.type}</li>
                <li>制片地区：${product.region}</li>
                <li>语言：${product.language}</li>
                <li>其他：${valias}</li>
                <li>本站更新：${teimFormat(product.uptime,0)} </li>
              </ul>
            </div>
            <div class="episode">
              <h2 class="episode-title ">播放方式</h2>
              <div>
                <a href="#" data-play="OnLine" >在线播放</a>
                <a href="#" data-play="download" >迅雷下载</a>
              </div>
            </div>
          </div>
        </div>`
      $(".videoInfo").html(html); //详情替换 
      $('.abstract>p').html(product.vintro)//修改简介
      $(".right-box .movieHot").html(`<a href="JavaScript:;">${product.likenum}人想看</a> / <a href="JavaScript:;">${product.Readnum}人看过</a> / <a href="JavaScript:;">${product.thinknum}人喜欢</a>`)
      


      function navHtml(play){
        var navHtml= `
        <li class="breadcrumb-item"><a href="index.html">首页</a></li>
        <li class="breadcrumb-item"><a href="${product.classify=="电影"?"./movie.html":"./tv.html"}">${product.classify}</a></li>
        <li class="breadcrumb-item">${product.vname}</li>`
        $(".navigation .breadcrumb").html(navHtml)//修改导航
      }
      navHtml()

      $("title").html(product.vname + " 影片详情")//页面标题修改
      //绑定播放按钮事件
      $("[data-play=OnLine]").click(function(){
        console.log("播放第一集")
        $("[data-OnLine=play] div.play>div").removeClass("d-none");//显示播放区域
        $(".videoInfo").addClass("d-none");//隐藏影片详情
        play(episodeList[0].v_url,episodeList[0].vname)

      })
      $("[data-play=download]").click(function(){
        alert("暂不支持下载");
      })
      //修改剧集列表
      var episodeListHtml=``
      for(let item of episodeList){//不显示明文链接地址的话 在本页var 一个数组 遍历id给标签 验证然后 用id来判断链接地址 
        episodeListHtml+=`<a href="javascript:;" data-playUrl="${item.v_url}" >${item.vname}</a>`
      }

      $(".guessing-main>.movie-box").html(videoItem(guessLike))//推荐视频  循环在 公共js里面

      $(".episode-box>div").html(episodeListHtml)
      //绑定剧集点击播放事件
      $(".episode-box>div>a").click(function(){
        $("[data-OnLine=play] div.play>div").removeClass("d-none");//显示播放区域
        $(".videoInfo").addClass("d-none");//隐藏影片详情
        
        var playUrl=$(this).attr("data-playUrl")
        var vname = $(this).html()
          
        $(".episode-box>div>a").removeClass("active")//取消所有的active
        $(this).addClass("active") //加active
        //添加
        $(".episode-box .details-title>span").html("/正在播放:" + vname)
        play(playUrl,vname)
      })
    }
  })

  $.ajax({//评论列表
    url:"http://127.0.0.1:8080/details/vcomment?vid=" + vid,
    type:"get",
    success:function(res){
      var list = res.data
      var i = 1
      var htmlBox = ""
      for(var item of list ){
        var html = `
        <div class="comment-box row">
          <div class="col-1 pr-0">
            <img src="./img/user/c7.jpg" alt="">
          </div>
          <div class="col-11 pl-0">
            <div class="comment-info">
              <div class="d-flex justify-content-between mb-2">
                <div class="uname">han3268<span class="comment-time">${teimFormat(item.ctime)}</span></div>
                <div class="comment-tower">#${i}</div>
              </div>
              <p>${item.content}</p>
            </div>
            <div class="d-flex justify-content-end">
              <div class="comment-evaluate"><a class="comment-praise" href="JavaScript:;"">赞（${item.praise}）</a> | <a class="comment-trample" href="JavaScript:;"">踩（${item.trample}）</a></div>
            </div>
          </div>
        </div>`
        htmlBox += html
        i++
      }
      
      if(list.length>1){
        $(".comment .comment-info ").html(htmlBox); //替换 
      }
      
    }
  })

  $.ajax({//想看
    url:"http://localhost:8080/index/indexF1",
    type:"get",
    success:function(res){
      //console.log(res.data)
      var list =res.data 
      var htmlBox = ""
      for(let product of list ){
        var html = ``
        htmlBox += html
      }
     //console.log(htmlBox)
      //$(".indexF1 .movie-box").append(htmlBox); //替换 
    }
  })

  $.ajax({//喜欢
    url:"http://localhost:8080/index/indexF1",
    type:"get",
    success:function(res){
      //console.log(res.data)
      var list =res.data 
      var htmlBox = ""
      for(var product of list ){
        var html = ``
        htmlBox += html
      }
     //console.log(htmlBox)
      //$(".indexF1 .movie-box").append(htmlBox); //替换 
    }
  })


  //右边推荐 
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
  $.ajax({//右边列表
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
  




  function teimFormat(teim,type){//2019-01-27T16:00:00.000Z 转 2019-01-27
    var d1 = new Date(teim)
    if(type==0){//日期
      return d1.toLocaleDateString() =='Invalid Date'?"无效日期":d1.toLocaleDateString()
    }else if(type==1){//时间
      return d1.toLocaleDateString() =='Invalid Date'?"无效日期":d1.toLocaleTimeString()
    }else{// 日期时间
      return d1.toLocaleDateString() =='Invalid Date'?"无效日期":d1.toLocaleString()
    }
    
  }
  
  function play(url,vname){//播放视频
    if(url){
      const dp = new DPlayer({
        container: document.getElementById('videoPlay'),
        video: {
          url: url,
          type: 'hls',//类型
        },
        preload: 'auto',
        autoplay:true
      });
    }
  }



})//$(尾部)

