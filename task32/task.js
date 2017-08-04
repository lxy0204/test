/**
 * Created by Administrator on 2017/8/3.
 */
var username = {
    lable: '姓名',
    type: 'text',
    id: 'user_name',
    validator: function(){
        var name_text = document.getElementById(datas.id);
        var input_name = document.getElementById(datas.id).value.trim();
        var tips = document.getElementById(datas.id + "tip");
        if(input_name.replace(/(^s*)|(s*$)/g, "").length == 0){
            tips.style.color = "red";
            tips.innerText = "输入不能包含空格";
            name_text.style.border = "1px solid red";
        }else if(input_name.test(/[\u4E00-\u9FA5\uf900-\ufa2d]/)){
            // 匹配中文
            if(input_name.length < 2 || input_name > 8){
                tips.style.color = "red";
                tips.innerText = "格式错误，名字应为4～16个字符";
                name_text.style.border = "1px solid red";
            }else{
                tips.style.color = "green";
                tips.innerText = "格式正确";
                name_text.style.border = "1px solid green";
            }
        }else if(input_name.length < 4 || input_name.length > 16){
            // 匹配英文
            tips.style.color = "red";
            tips.innerText = "格式错误，名字应为4～16个字符";
            name_text.style.border = "1px solid red";
        }else{
            tips.style.color = "green";
            tips.innerText = "格式正确";
            name_text.style.border = "1px solid green";
        }
    },
    rules:'长度为4～16个字符',
    success:'格式正确',
    fail:'输入格式错误，应为4～16个字符'
};
var pwd = {
    lable: '密码',
    type: 'password',
    id: 'user_pwd',
    validator: function() {
        var pwd_text = document.getElementById(datas.id);
        var user_pwd = document.getElementById(datas.id).value.trim();
        var pwdtip = document.getElementById(datas.id + "tip");
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (user_pwd.replace(/(^s*)|(s*$)/g, "").length == 0) {
            pwdtip.style.color = "red";
            pwdtip.innerText = "输入不能包含空格";
            pwd_text.style.border = "1px solid red";
        } else {
            if (reg.test(user_pwd)) {
                pwdtip.style.color = "green";
                pwdtip.innerText = "格式正确";
                pwd_text.style.border = "1px solid green";

            } else {
                pwdtip.style.color = "red";
                pwdtip.innerText = "格式错误，应为6-20个字母与数字组合";
                pwd_text.style.border = "1px solid red";
            }
        }
    },
    rules:'6-20个字母与数字组合',
    success:'格式正确',
    fail:'输入格式错误，应为6-20个字母与数字组合'
};
var email = {
    lable: '邮箱',
    type: 'text',
    id: 'user_email',
    validator: function() {
        var email_text = document.getElementById(datas.id);
        var user_email = document.getElementById(datas.id).value.trim();
        var emailtip = document.getElementById(datas.id + "tip");
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (user_email.replace(/(^s*)|(s*$)/g, "").length == 0) {
            emailtip.style.color = "red";
            emailtip.innerHTML = "输入不能包含空格";
            email_text.style.border = "1px solid red";
        } else {
            if (reg.test(user_email)) {
                emailtip.style.color = "green";
                emailtip.innerHTML = "格式正确";
                email_text.style.border = "1px solid green";
            } else {
                emailtip.style.color = "red";
                emailtip.innerHTML = "格式错误，请重新输入";
                email_text.style.border = "1px solid red";
            }
        }
    },
    rules:'不能出现特殊符号，正确形式×××@×××.×××',
    success:'格式正确',
    fail:'输入格式错误，请重新输入'
};
var phone = {
    lable: '手机',
    type: 'text',
    id: 'user_phone',
    validator: function() {
        var phone_text = document.getElementById(datas.id);
        var user_phone = document.getElementById(datas.id).value.trim();
        var phonetip = document.getElementById(datas.id + "tip");
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (user_phone.replace(/(^s*)|(s*$)/g, "").length == 0) {
            phonetip.style.color = "red";
            phonetip.innerHTML = "输入不能包含空格";
            phone_text.style.border = "1px solid red";
        } else {
            if (reg.test(user_phone)) {
                phonetip.style.color = "green";
                phonetip.innerHTML = "格式正确";
                phone_text.style.border = "1px solid green";
            } else {
                phonetip.style.color = "red";
                phonetip.innerHTML = "输入号码无效，请重新输入";
                phone_text.style.border = "1px solid red";
            }
        }
    },
    rules:'请输入正确的手机号码',
    success:'格式正确',
    fail:'输入号码无效，请重新输入'
};
function selItem(){
    var con = document.getElementById("container");
    con.innerHTML = "";
    var sel = document.getElementsByName("select");
    var sel_id;
    var count = 0;
    for(var i = 0; i < sel.length; i++){
        if(sel[i].checked){
            sel_id = sel[i].getAttribute("id");
            switch (sel_id){
                case "name":createForm(username);
                    break;
                case "pass":createForm(pwd);
                    break;
                case "mail":createForm(email);
                    break;
                case "phone":createForm(phone);
                    break;
            }
            count++;
        }
    }
    if(count == 0){
        alert("请选择要生成的表格项");
    }
}
function createForm(data){
    var con = document.createElement("div");
    var stylechoose = document.getElementById("style2");
    if(stylechoose.checked){
        con.setAttribute("class", "style_2");
    }else{
        con.setAttribute("class", "style_1");
    }
    var node = document.createElement("label");
    node.innerText = data.lable;
    node.setAttribute("for", data.id);
    con.appendChild(node);
    node = document.createElement("input");
    node.setAttribute("type", data.type);
    node.setAttribute("id", data.id);
    con.appendChild(node);
    node = document.createElement("span");
    node.setAttribute("id", data.id + "tip");
    if(stylechoose.checked){
        node.setAttribute("class", "style2_span");
    }else{
        node.setAttribute("class", "style1_span");
    }
    con.appendChild(node);
    node = document.createElement("br");
    con.appendChild(node);
    document.getElementById("container").appendChild(con);
    funEvent(data);
}
function funEvent(data){
    document.getElementById(data.id).addEventListener("focus", function(){
        document.getElementById(data.id + "tip").innerText = data.rules;
        datas = data;
        document.getElementById(data.id).addEventListener("blur", data.validator);
    });
}
function init(){
    document.getElementById("generate").addEventListener("click", selItem);
}
init();