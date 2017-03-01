var content = document.getElementsByTagName("tr");
var entry = content.length;
var pages;
if(entry%8==0)
  pages = entry/8;
else
  pages = entry/8+1;
var clone = function () {
  var cloneContent = [];
  for(var i = 0;i<entry;i++)
    cloneContent[i] = content[i].cloneNode(1);
  return cloneContent;
}
var cloneContent = clone();
setPage(document.getElementById("page"),pages,1);
 //container 容器，count 总页数 pageindex 当前页数
function setPage(container, count, pageindex) {
var container = container;
var count = count;
var pageindex = pageindex;
var a = [];
document.getElementById("sheet").innerHTML = null;
upDataPage(pageindex);
  //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
  if (pageindex == 1) {
    a[a.length] = "<a href=\"#\" class=\"prev unclick\">上一页</a>";
  } else {
    a[a.length] = "<a href=\"#\" class=\"prev\">上一页</a>";
  }
  function setPageList() {
    if (pageindex == i) {
      a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
    } else {
      a[a.length] = "<a href=\"#\">" + i + "</a>";
    }
  }
  //总页数小于10
  if (count <= 10) {
    for (var i = 1; i <= count; i++) {
      setPageList();
    }
  }
  //总页数大于10页
  else {
    if (pageindex <= 4) {
      for (var i = 1; i <= 5; i++) {
        setPageList();
      }
      a[a.length] = "...<a href=\"#\">" + count + "</a>";
    } else if (pageindex >= count - 3) {
      a[a.length] = "<a href=\"#\">1</a>...";
      for (var i = count - 4; i <= count; i++) {
        setPageList();
      }
    }
    else { //当前页在中间部分
      a[a.length] = "<a href=\"#\">1</a>...";
      for (var i = pageindex - 2; i <= pageindex + 2; i++) {
        setPageList();
      }
      a[a.length] = "...<a href=\"#\">" + count + "</a>";
    }
  }
  if (pageindex == count) {
    a[a.length] = "<a href=\"#\" class=\"next unclick\">下一页</a>";
  } else {
    a[a.length] = "<a href=\"#\" class=\"next\">下一页</a>";
  }
  container.innerHTML = a.join("");
  //事件点击
  var pageClick = function() {
    var oAlink = container.getElementsByTagName("a");
    var inx = pageindex; //初始的页码
    oAlink[0].onclick = function() { //点击上一页
      if (inx == 1) {
        return false;
      }
      inx--;
      setPage(container, count, inx);
      return false;
    }
    for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
      oAlink[i].onclick = function() {
        inx = parseInt(this.innerHTML);

        setPage(container, count, inx);

        return false;
      }
    }
    oAlink[oAlink.length - 1].onclick = function() { //点击下一页
      if (inx == count) {
        return false;
      }
      inx++;
      setPage(container, count, inx);
      return false;
    }
  } ()
}
function upDataPage (pageindex) {
  var beforeEntry = 8*(pageindex-1);
  var thisEntry = (entry - beforeEntry>=8)?8:(entry - beforeEntry);
  for(var i=0;i<thisEntry;i++)
    document.getElementById("sheet").appendChild(cloneContent[beforeEntry+i]);
}