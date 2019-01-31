function pagingHtml(page,pageCount){
  //分页导航
  $("div.paging>div").html(`${page}/${pageCount}页`)//page当前页  pageCount总页数
  var pagemin //最新小开始页
  var pagemax //最新大开始页
  //res.page 当前页
  //res.pageCount 总共页数
  if(page-2 <= 1){//一共显示五个按钮 判断前两页内容 不为负数
    pagemin = 1//如果小于1则等于一 否则等原本的减二
  }else{
    pagemin = page-2
  }
  console.log(pagemin)
  //再判断最大值不能大于 res.pageCount//总共的页数
  if(page+2 >= pageCount){//如果 最小页数加5 大于总页数 则 就等于最大页数
    pagemax = pageCount 
  }else{
    pagemax = page+2
  }
  console.log("pagemax:"+pagemax)
  //1.判断 如果pagemin==1则开始循环排序++
  //2.判断 如果pagemax==res.pageCount则开始循环 (pagemax-4)++
  //3.否则如果 pagemin++循环排序   3.和1.是一样的 那么就判断2.然后遍历
  if( pagemax == pageCount ){//最大数 == 总页数 就减五遍历
    console.log('最大减循环')
    pageItem(pagemax-4,pagemax)//先减4 再循环加上去 就从6 7 "8" 9 10 
  }else{//就正常++ 遍历
    console.log('正常循环++')
    pageItem(pagemin,pagemin+4)
  }
  function pageItem(fi,Count){//导航遍历函数
    var htmlBox=``
    //上一页 html 判断 -1 会不会超出
    htmlBox+=`
    ${page > 5?`<li class="page-item "><a class="page-link" href="?page=1">首页</a></li>`:''}
    <li class="page-item ${(page-1) < 1?'disabled':''}"><a class="page-link" href="?page=${page-1}"> < </a></li>`
    for(var i=fi ;i <= Count;i++){
      var  pageItem = `
      <li class="page-item ${page==i?'active':''}"><a class="page-link" href="?page=${i}">${i}</a></li>`
      htmlBox+=pageItem
    }
    //上一页 html 判断 -1 会不会超出
    htmlBox+=`
    <li class="page-item ${(page + 1) > pageCount ?'disabled':''}"><a class="page-link" href="?page=${page+1}"> > </a></li>
    ${page+2 >= pageCount?'':`<li class="page-item "><a class="page-link" href="?page=${pageCount}">末页</a></li>`}`
    $(".paging ul.pagination").html(htmlBox)//替换html
    return htmlBox
  }
}
