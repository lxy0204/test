/**
 * Created by Administrator on 2017/8/2.
 */
var names = document.getElementById("name");
var pwd = document.getElementById("pwd");
var sure_pwd = document.getElementById("sure_pwd");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var tips_n = document.getElementById("tips_n");
var tips_pwd = document.getElementById("tips_pwd");
var tips_sp = document.getElementById("tips_sp");
var tips_e = document.getElementById("tips_e");
var tips_p = document.getElementById("tips_p");
var btn = document.getElementById("check");
function event(){
    names.addEventListener("focus", function(){
        tips_n.style.color = "#969294";
        tips_n.innerHTML = "必填，4~16位的字符";
        names.style.border = "1px solid initial";
    });
    pwd.addEventListener("focus", function(){
        tips_pwd.style.color = "#969294";
        tips_pwd.innerHTML = "输入6-20个字母与数字组合的密码";
        pwd.style.border = "1px solid initial";
    });
    sure_pwd.addEventListener("focus", function(){
        tips_sp.style.color = "#969294";
        tips_sp.innerHTML = "请再次输入相同密码";
        sure_pwd.style.border = "1px solid initial";
    });
    email.addEventListener("focus", function(){
        tips_e.style.color = "#969294";
        tips_e.innerHTML = "请输入正确的邮箱（不能出现特殊符号，正确形式×××@×××.×××）";
        email.style.border = "1px solid initial";
    });
    phone.addEventListener("focus",function(){
        tips_p.style.color = "#969294";
        tips_p.innerHTML = "请输入正确的手机号码";
        phone.style.border = "1px solid initial";
    });
}
function init(){
    event();
    ch_name();
    ch_pwd();
    s_pwd();
    ch_email();
    ch_phone();
    btn.addEventListener("click", function(){
        var divs = document.getElementsByTagName("div");
        if(names.style.borderColor == "green" && pwd.style.borderColor == "green" && sure_pwd.style.borderColor == "green" && email.style.borderColor == "green" && phone.style.borderColor == "green"){
            alert("提交成功！");
        }else{
            alert("输入有误，提交失败！");
        }
    })
}
function ch_name(){
    names.addEventListener("blur", function(){
        var str = document.getElementById("name").value;
        if(str.replace(/(^s*)|(s*$)/g, "").length == 0){
            tips_n.style.color = "red";
            tips_n.innerHTML = "输入格式错误，不能输入空格";
            names.style.border = "1px solid red";
            return;
        }else{
            if(str_length(str) >= 4 && str_length(str) <= 16){
                tips_n.style.color = "green";
                tips_n.innerHTML = "输入格式正确";
                names.style.border = "1px solid green";
                return;
            }else{
                tips_n.style.color = "red";
                tips_n.innerHTML = "输入格式错误，应输入位数为4～16的字符";
                names.style.border = "1px solid red";
                return;
            }
        }
        function str_length(str) {
            var reg = "/[\u4E00-\u9FA5\uf900-\ufa2d]/";
            var count = 0;
            var str_l = str.length;
            for(var i = 0; i < str_l; i++) {
                if(str[i].match(reg)) {
                    count += 2;
                }else{
                    count += 1;
                }
            }
            return count;
        }
    });
}
function ch_pwd(){
    pwd.addEventListener("blur", function(){
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        var str = pwd.value;
        if(str.replace(/(^s*)|(s*$)/g, "").length == 0){
            tips_pwd.style.color = "red";
            tips_pwd.innerHTML = "输入格式错误，不能输入空格";
            pwd.style.border = "1px solid red";
            return;
        }else {
            if(reg.test(str)){
                tips_pwd.style.color = "green";
                tips_pwd.innerHTML = "密码格式正确";
                pwd.style.border = "1px solid green";
                return;

            }else{
                tips_pwd.style.color = "red";
                tips_pwd.innerHTML = "密码只能输入6-20个字母和数字的组合";
                pwd.style.border = "1px solid red";
                return;
            }
        }
    });
}
function s_pwd(){
    sure_pwd.addEventListener("blur", function(){
        var sp = sure_pwd.value;
        var p = pwd.value;
        if(sp.replace(/(^s*)|(s*$)/g, "").length == 0){
            tips_sp.style.color = "red";
            tips_sp.innerHTML = "输入格式错误，不能输入空格";
            sure_pwd.style.border = "1px solid red";
            return;
        }else{
            if(p == sp){
                tips_sp.style.color = "green";
                tips_sp.innerHTML = "密码一致";
                sure_pwd.style.border = "1px solid green";
                return;
            }else{
                tips_sp.style.color = "red";
                tips_sp.innerHTML = "密码输入不一致，请重新输入";
                sure_pwd.style.border = "1px solid red";
                return;
            }
        }
    });
}
function ch_email(){
    email.addEventListener("blur", function(){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        var str = email.value;
        if(str.replace(/(^s*)|(s*$)/g, "").length == 0){
            tips_e.style.color = "red";
            tips_e.innerHTML = "输入格式错误，不能输入空格";
            email.style.border = "1px solid red";
            return;
        }else{
            if(reg.test(str)){
                tips_e.style.color = "green";
                tips_e.innerHTML = "邮箱格式正确";
                email.style.border = "1px solid green";
                return;
            }else{
                tips_e.style.color = "red";
                tips_e.innerHTML = "输入格式错误，请重新输入";
                email.style.border = "1px solid red";
                return;
            }
        }
    });
}
function ch_phone(){
    phone.addEventListener("blur", function(){
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        var str = phone.value;
        if(str.replace(/(^s*)|(s*$)/g, "").length == 0){
            tips_e.style.color = "red";
            tips_e.innerHTML = "输入格式错误，不能输入空格";
            email.style.border = "1px solid red";
            return;
        }else{
            if(reg.test(str)){
                tips_p.style.color = "green";
                tips_p.innerHTML = "手机号码可用";
                phone.style.border = "1px solid green";
                return;
            }else{
                tips_p.style.color = "red";
                tips_p.innerHTML = "输入手机号码不可用，请重新输入";
                phone.style.border = "1px solid red";
                return;
            }
        }
    });
}
init();