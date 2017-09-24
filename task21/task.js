/**
 * Created by Administrator on 2017/7/20.
 */
var arr = [];
var arr2 = [];
var tags = document.getElementById("tag");
var hobby = document.getElementById("hobby");
var tag_show = document.getElementById("tag_in");
var hobby_show = document.getElementById("hobby_in");
var tag_child = document.getElementById("tag_in").childNodes;
var btn = document.getElementById("hobby_btn");
// 强行加个remove、indexof哈哈哈哈哈
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
// 回车
function insert_enter(){
    var str = tags.value;
    var flag = /，|,|\s|、/;
    if(flag.test(str)){
        var match = str.match(flag);
        var s = match.input;
        s = s.substring(0, s.length - 1).trim();
        insert_fh(s);
    }else if(event.keyCode === 13){
        str = str.trim();
        if(arr.indexOf(str) == -1 && str !== ""){
            if(arr.length < 10){
                arr.push(str);
            }else{
                arr.shift(arr[0]);
                arr.push(str);
            }
        }else{
            alert("请不要输入重复的字符(回车)！");
        }
        show_t(arr, tag_show);
        tags.value = "";
        clicks(tag_child);
    }
}
// 空格或逗号或顿号
function insert_fh(s_match){
    if(s_match.length > 0){
        if(arr.length > 0 && arr.indexOf(s_match) > -1){
            alert("请不要输入重复的字符！");
            tags.value = "";
        }else if(arr.length < 10){
            arr.push(s_match);
        }else{
            arr.shift(arr[0]);
            arr.push(s_match);
        }
        show_t(arr, tag_show);
        tags.value = "";
        clicks(tag_child);
    }
}
// 鼠标覆盖
function m_over(){
    var target = window.event.target;
    target.innerHTML = "删除" + target.innerHTML;
    target.style.background = "red";
    target.addEventListener("click", del);
}
// 鼠标离开
function m_out(){
    var target=window.event.target;
    target.innerHTML=target.innerHTML.split("删除")[1];
    target.style.background="black";
}
// 点击删除
function del(){
    var t = window.event.target.innerHTML.split("删除")[1];
    arr.remove(t);
    show_t(arr, tag_show);
    clicks(tag_child);
}
// 鼠标事件
function clicks(t){
    for(var i = 0; i < t.length; i++){
        t[i].addEventListener("mouseover", m_over);
        t[i].addEventListener("mouseout", m_out);
    }
}
// tag显示
function show_t(list, show){
    show.innerHTML = "";
    var array = [];
    for(var i = 0; i < list.length; i++){
        array = "<span id='box_tag'>" + list[i] + "</span>";
        show.innerHTML += array;
    }
}
// 兴趣爱好
function hobby_insert(){
    var str2 = hobby.value;
    var s2 = str2.trim();
    var hobby_word = s2.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
    for(var i = 0;i < hobby_word.length; i++){
        arr2.push(hobby_word[i].trim());
    }
    var arr3 = [];
    for(var j = 0;j < arr2.length; j++){
        if(arr3.indexOf(arr2[j]) === -1 && arr2[j] !== ""){
            arr3.push(arr2[j]);
        }
    }
    if(arr3.length > 10){
        arr3.splice(0, arr3.length-10);
    }
    show_t(arr3, hobby_show);
}
function init(){
    tags.addEventListener("keyup", insert_enter);
    btn.addEventListener("click", hobby_insert);
}
init();