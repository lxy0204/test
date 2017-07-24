/**
 * Created by Administrator on 2017/7/24.
 */
var tree = document.getElementById("tree");
var arr = [];
var flag;
var timer = null;
var divs = document.getElementsByTagName("div");
var input = document.getElementById("input");
var text = document.getElementById("text");
var insert = document.getElementById("insert");
// 遍历
function Traversal(node){
    if(node != null){
        arr.push(node);
        for(var i = 0; i < node.children.length; i++){
            Traversal(node.children[i]);
        }
    }
}
// 变色
function change_color(){
    var i = 0;
    var input_value = input.value;
    arr[i].style.backgroundColor = "green";
    timer = setInterval(function(){
        i++;
        if(i < arr.length){
            var content = arr[i].firstChild.nodeValue.trim();
            if(input_value == content && content){
                clearInterval(timer);
                arr[i - 1].style.backgroundColor = "#ffffff";
                arr[i].style.backgroundColor = "red";
                var str = "";
                str = "<p>找到：" + content + "</p>";
                text.innerHTML = str;
            }else{
                arr[i].style.backgroundColor = "green";
                arr[i - 1].style.backgroundColor = "#ffffff";
            }
        }else{
            clearInterval(timer);
            arr[arr.length - 1].style.backgroundColor = "#ffffff";
            if(flag == 1){
                alert("没有找到输入的值！");
            }
        }
    }, 500);
}
// 恢复
function back_color(){
    arr = [];
    clearInterval(timer);
    for(var i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "#ffffff";
    }
    text.innerHTML = "";
}
// 删除
function delete_dom(){
    Traversal(tree);
    var target = window.event.target;
    target.style.backgroundColor = "yellow";
    document.getElementById("button_del").addEventListener("click", function(){
        target.parentNode.removeChild(target);
        back_color();
    });
    document.getElementById("button_add").addEventListener("click", function(){
        var insertCont = insert.value;
        var content = target.innerHTML;
        target.innerHTML = content + "<div class='newDiv'>" + insertCont + "</div>";
    })
}
function init() {
    document.getElementById("button").addEventListener("click", function() {
        back_color();
        Traversal(tree);
        change_color();
    });
    document.getElementById("find").addEventListener("click", function() {
        flag = 1;
        back_color();
        Traversal(tree);
        change_color();
    });
    document.getElementById("container").addEventListener("click", function() {
        delete_dom();
    });
}
init();