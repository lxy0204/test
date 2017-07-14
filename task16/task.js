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
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市必须输入中文或者英文字符！");
        return;
    }
    if(!num.match(/^-?[1-9]\d*$/)){
        alert("空气质量数必须输入整数！");
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
        j += '<tr><td>' + city + '</td><td>' + data[city] + '</td><td>' + "<button onclick='delBtnHandle(\""+city+"\")'>" + '删除' + '</button></td></tr>';
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
    window.onload = function(){
        btn.addEventListener("click", addBtnHandle);
    };
}

init();