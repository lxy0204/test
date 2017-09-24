/**
 * Created by Administrator on 2017/7/14.
 */
var num = document.getElementById("input");
var arr = [];
var show = document.getElementById("container");
//检查输入
function check(){
    if(!num.value.match(/^[0-9]+$/)){
        alert("请输入一个数字！");
        return 0;
    }
    var n = num.value.trim();
    if(n <= 10 || n >= 100){
        alert("请输入10-100之间的数字！");
        return 0;
    }
}
// 左输入
function leftInput(){
    if(check() != 0){
        arr.unshift(num.value);
        changeArr();
        num.value = "";
    }
}
// 右输入
function rightInput(){
    if(check() != 0){
        arr.push(num.value);
        changeArr();
        num.value = "";
    }
}
// 左出
function leftOutput(){
    if(!show.innerHTML == " "){
        alert("将要删除的数字为" + arr[0]);
        arr.shift(arr[0]);
        changeArr();
    }else{
        alert("没有数字可以删除！");
        return;
    }

}
// 右出
function rightOutput(){
    if(!show.innerHTML == " "){
        var x = arr.length - 1;
        alert("将要删除的数字为" + arr[x]);
        arr.pop(arr[x]);
        changeArr();
    }else{
        alert("没有数字可以删除！");
        return;
    }
}
// 显示输入的数据
function changeArr(){
    show.innerHTML = "";
    for(var i = 0; i <= arr.length - 1; i++){
        var li = document.createElement("li");
        li.innerText = arr[i];
        li.style.height = arr[i] * 1.6 + "px";
        li.style.backgroundColor = "#FF4D00";
        show.appendChild(li);
    }
    document.getElementById("input").innerText = "";
}
// 选择排序
function sort(){
    var i = 0, j = 1, temp;
    var time = setInterval(run, 25);
    function run(){
        if(i < arr.length){
            if (j < arr.length){
                if(arr[i] > arr[j]){
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    changeArr();
                }
                j++;
            }else{
                i++;
                j = i + 1;
            }
        }else{
            clearInterval(time);
            return;
        }
    }
}
// 随机生成数据
function ran(){
    for(var i = 0; i < 10; i++){
        arr[i] = Math.floor(Math.random() * 91 + 9);
    }
    changeArr();
}
function init(){
    document.getElementById("li").addEventListener("click", leftInput);
    document.getElementById("ri").addEventListener("click", rightInput);
    document.getElementById("lo").addEventListener("click", leftOutput);
    document.getElementById("ro").addEventListener("click", rightOutput);
    document.getElementById("sort").addEventListener("click", sort);
    document.getElementById("ran").addEventListener("click", ran);
}

init();

