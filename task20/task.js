/**
 * Created by Administrator on 2017/7/14.
 */
var arr = [];
var num = document.getElementById("input");
var container = document.getElementById("container");

// 确认之后插入
function insert(){
    // 空格、回车、逗号、顿号
    var str = num.value.split(/[,\s+、，\r]/);
    for(var i = 0; i < str.length; i++){
        arr.push(str[i]);
    }
    for(var j = 0; j < arr.length; j++){
        var div = document.createElement("div");
        div.innerText = arr[j];
        container.appendChild(div);
    }
}
// 查询
function ch(){
    var c = document.getElementById("ch").value;
    var find = container.getElementsByTagName("div");
    for(var i = 0; i < find.length; i++){
        var b = find[i].innerHTML.replace(new RegExp(c, "g"), "<span>" + c + "</span>");
        find[i].innerHTML = b;
    }
}

// 花式插入
function inserts(){
    var str1 = arr.toString().split(/[,\s+、，\r]/);
    arr = [];
    for(var i = 0; i < str1.length; i++){
        arr.push(str1[i]);
    }
    var str2 = "";
    for(var j = 0; j < arr.length; j++){
        str2 += "<div>" + arr[j] + "</div>";
    }
    container.innerHTML = str2;
    str2 = "";
}

function init(){
    document.getElementById("li").addEventListener("click", function(){arr.unshift(num.value); inserts()});
    document.getElementById("ri").addEventListener("click", function(){arr.push(num.value); inserts()});
    document.getElementById("lo").addEventListener("click", function(){arr.shift(num.value); inserts()});
    document.getElementById("ro").addEventListener("click", function(){arr.pop(num.value); inserts()});
    document.getElementById("check").addEventListener("click", function(){ch()});
    document.getElementById("sure").addEventListener("click", function(){insert()});
}

init();

