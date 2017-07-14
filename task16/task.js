/**
 * Created by Administrator on 2017/7/14.
 */
/**
 * data，存储用户输入的空气指数数据
 * 示例格式：
 * data = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var data = {};

/**
 * 从用户输入中获取数据，向data中增加一条数据
 * 然后渲染list列表，增加新增的数据
 */
function addData() {
  var city = document.getElementById("city-input").value.trim();
  var num = document.getElementById("value-input").value.trim();
  if(!city.match(/^[\u4e00-\u9fa5|a-zA-Z]*$/)){
    alert("请输入中文或者英文字符！");
    return;
  }
  if(!num.match(/^-?[1-9]\d*$/)){
    alert("请输入整数！");
    return;
  }
  data[city] = num;
}

/**
 * 渲染table表格
 */
function renderList() {
  var j = "<tr><td>城市</td><td>天气</td><td>操作</td></tr>";
  var i = 0;
  for(var city in data){
    j += "<tr><td>" + city + "</td><td>" + data[city] + "</td><button>" + "删除" + "</button></tr>";
  }
  document.getElementById("table").innerHTML = j;
}

/**
 * 点击btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addData();
  renderList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(ct) {
  delete data[ct];
  renderList();
}

function init() {
  // 在这下面给btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn = document.getElementById("btn");
  btn.click = addBtnHandle();
  // 想办法给table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var tab = document.getElementById("table");
  var button = tab.getElementsByTagName("button");
  var ct = tab.children.value;
  button.onclick = delBtnHandle(ct);
}

init();