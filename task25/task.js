/**
 * Created by Administrator on 2017/7/25.
 */
window.onload = function(){
    var spans = document.getElementsByTagName("span");
    var add = document.getElementById("btn_add");
    var del = document.getElementById("btn_del");
    var find = document.getElementById("btn_find");
    for(var i = 0; i < spans.length; i++){
        spans[i].onclick = flex;
    }
    var dts = document.getElementsByTagName("dt");
    for(var i = 0; i < dts.length; i++){
        dts[i].onclick = change_color;
    }
    dts[0].onclick();
    add.onclick = insert;
    del.onclick = delete_dom;
    find.onclick = search_dom;
}
// 选中变色
function change_color(){
    // 消除查询的颜色
    back_Color();
    // 若有被选中的要先删掉标签
    var select_dt = document.getElementById("tree").parentNode.getElementsByClassName("selected")[0];
    if(select_dt){
        del_name(select_dt, "selected");
    }
    add_name(this, "selected");
}
// 恢复颜色
function back_Color(){
    var back = document.getElementById("tree").parentNode.getElementsByTagName("dt");
    for(var i = 0; i < back.length; i++){
        del_name(back[i], "result");
    }
}
// 加class
function add_name(target, name){
    if(target.className.search(name) == -1){
        if(target.className){
            target.className += " " + name;
        }else{
            target.className = name;
        }
    }
}
// 去class
function del_name(target, name){
    if(target.className){
        target.className = target.className.replace(name, "");
    }
}
// 伸缩
function flex(){
    var target = this.parentNode.parentNode;// dl
    var arr = target.children;// dt(+),dd
    if(arr[1]){// dd
        if(arr[1].className.search("hide") == -1){
            var a_dd = target.getElementsByTagName("dd");
            var a_dt = target.getElementsByTagName("dt");
            for(var i = 0; i < a_dd.length; i++){
                add_name(a_dd[i], "hide");
            }
            for(var i = 0; i < a_dt.length; i++){
                a_dt[i].children[0].innerHTML = "+";
            }
        }
        else{
            for(var i = 1; i < arr.length; i++){
                del_name(arr[i], "hide");
                arr[i].parentNode.children[0].children[0].innerHTML = "-";
            }
        }
    }else{
        this.innerHTML = this.innerHTML == "+"?"-":"+";// 没有子树的情况
    }
}
function insert(){
    var input = document.getElementById("text");
    if(input.value){
        // document.getElementById("tree").parentNode.getElementsByClassName("selected")为数组
        var sel = document.getElementById("tree").parentNode.getElementsByClassName("selected")[0];
        var add = sel.parentNode.children;
        var flag = 0;
        for(var i = 1; i < add.length; i++){
            del_name(add[i], "hide");
            var dt = add[i].children[0].children[0].childNodes[1].nodeValue ;
            if(dt == input.value){
                flag=1;
                alert("辣鸡！式神已存在！");
            }
        }
        sel.children[0].innerHTML = "-";
        if(flag){
            return;
        }
        var new_dd = document.createElement("dd");
        new_dd.innerHTML = "<dl><dt><span>+</span>"+input.value+"</dt></dl>";
        sel.parentNode.appendChild(new_dd);
        var new_dt = new_dd.getElementsByTagName("dt")[0];
        // 为新加入的节点进行操作前的准备（没有它会死！！！）
        new_dt.onclick = change_color;
        new_dt.children[0].onclick = flex;
    }
}
function delete_dom(){
    var sel = document.getElementById("tree").parentNode.getElementsByClassName("selected")[0];
    if(sel === undefined){
        alert("请先选择要删除的式神！");
    }else{
        if(sel.id == "tree"){
            alert("boss不能灭！");
        }else{
            var sel_super = sel.parentNode.parentNode;
            var sel_parent = sel_super.parentNode;
            sel_parent.removeChild(sel_super);
        }
    }
}
function search_dom(){
    back_Color();
    var input = document.getElementById("text");
    if(input.value){
        var dts = document.getElementsByTagName("dt");
        var flag = 1;
        for(var i = 0; i < dts.length; i++){
            if(dts[i].childNodes[1].nodeValue == input.value){
                find_parent(dts[i]);
                add_name(dts[i], "result");
                flag = 0;
            }
        }
        if(flag){
            alert("搜索不到这么垃圾的式神");
        }
    }
}
// 往下展开
function find_parent(target){
    var aim = target.parentNode.parentNode;// 数组dt
    // 不加toLowerCase会死（document）
    if(aim.nodeName.toLowerCase() != "body"){
        var dts = aim.parentNode.children;// dl里的dt、dd(数组)
        for(var i = 1; i < dts.length; i++){
            del_name(dts[i], "hide");
        }
        aim.parentNode.children[0].children[0].innerHTML = "-";
        find_parent(aim);
    }
}