/**
 * Created by Administrator on 2017/7/21.
 */
var tree = document.getElementById("tree");
var arr = [];
var timer = null;
var divs = document.getElementsByTagName("div");
var btn = document.getElementById("button");
// 先序遍历
function preOrder(node){
    if(node != null){
        arr.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}
// 中序遍历
function inOrder(node){
    if(node){
        inOrder(node.firstElementChild);
        arr.push(node);
        inOrder(node.lastElementChild);
    }
}
// 后序遍历
function postOrder(node){
    if(node){
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        arr.push(node);
    }
}
// 变色
function change_color(){
    var i = 0;
    arr[i].style.backgroundColor = "green";
    timer = setInterval(function(){
        i++;
        if(i < arr.length){
            arr[i - 1].style.backgroundColor = "#ffffff";
            arr[i].style.backgroundColor = "green";
        }else{
            clearInterval(timer);
            arr[arr.length - 1].style.backgroundColor = "#ffffff";
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
}
function init()
{
/*
    document.getElementById("pre").addEventListener("click", function(){
        back_color();
        preOrder(tree);
        change_color();
    });
    document.getElementById("post").addEventListener("click", function(){
        back_color();
        postOrder(tree);
        change_color();
    });
    document.getElementById("in").addEventListener("click", function(){
        back_color();
        inOrder(tree);
        change_color();
    });
*/
    btn.addEventListener("click", function(e){
        switch(e.target.id){
            case "pre":
                back_color();
                preOrder(tree);
                change_color();
                break;
            case "post":
                back_color();
                postOrder(tree);
                change_color();
                break;
            case "in":
                back_color();
                inOrder(tree);
                change_color();
                break;
        }
    });
}
init();