/**
 * Created by Administrator on 2017/7/14.
 */
var num = document.getElementById("input");
var arr = [];
var str = "";
var show = document.getElementById("container");

function leftInput(){
    if(num.value.match(/^[0-9]+$/)){
        arr.unshift(num.value);
        changeArr(arr);
        num.value = "";
    }else{
        alert("请输入一个数字！");
        return;
    }
}

function rightInput(){
    if(num.value.match(/^[0-9]+$/)){
        arr.push(num.value);
        changeArr(arr);
        num.value = "";
    }else{
        alert("请输入一个数字！");
        return;
    }
}

function leftOutput(){
    if(!show.innerHTML == " "){
        alert("将要删除的数字为" + arr[0]);
        arr.shift(arr[0]);
        changeArr(arr);
    }else{
        alert("没有数字可以删除！");
        return;
    }

}

function rightOutput(){
    if(!show.innerHTML == " "){
        var x = arr.length - 1;
        alert("将要删除的数字为" + arr[x]);
        arr.pop(arr[x]);
        changeArr(arr);
    }else{
        alert("没有数字可以删除！");
        return;
    }
}

function changeArr(array){
    str += array;
    show.innerHTML = str;
    str = "";
}

function init(){
    document.getElementById("li").addEventListener("click", leftInput);
    document.getElementById("ri").addEventListener("click", rightInput);
    document.getElementById("lo").addEventListener("click", leftOutput);
    document.getElementById("ro").addEventListener("click", rightOutput);
}

init();

