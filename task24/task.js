/**
 * Created by Administrator on 2017/7/24.
 */
var tree = document.getElementById("tree");
var arr = [];
var flag;
var remember;
var timer = null;
var divs = document.getElementsByTagName("div");
var input = document.getElementById("input");
var text = document.getElementById("text");
var insert = document.getElementById("insert");
var all_div = document.getElementById("container").getElementsByTagName("div");
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
function init() {
    for(var i = 0; i < all_div.length; i++){
        all_div[i].onclick = function(e){
            back_color();
            this.style.backgroundColor = "yellow";
            e.stopPropagation();
            remember = this;
        }
    }
    document.getElementById("button_del").addEventListener("click", function(){
        if(remember === undefined){
            alert("请选择要删除的节点！")
        }else{
            var parent = remember.parentNode;
            parent.removeChild(remember);
        }
    });
    document.getElementById("button_add").addEventListener("click", function(){
        var insertCont = insert.value;
        if(insertCont === ""){
            alert('请填写添加节点的内容');
        }else if(remember === undefined){
            alert('请先选中要操作的节点');
        }else{
            var newDiv = document.createElement("div");
            newDiv.innerHTML = insertCont;
            newDiv.className = "newDiv";
            remember.appendChild(newDiv);
            back_color();
            for (var i = 0; i < all_div.length; i++) {
                all_div[i].onclick = function(e) {
                    back_color();
                    this.style.backgroundColor = "yellow";
                    e.stopPropagation();
                    remember = this;
                };
            }
        }
    });
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
}
init();