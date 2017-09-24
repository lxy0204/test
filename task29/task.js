/**
 * Created by Administrator on 2017/8/1.
 */
console.log('test')
var tips = document.getElementById("tips");
var btn = document.getElementById("check");
function init(){
    btn.addEventListener("click", function(){
        var str = document.getElementById("name").value;
        if(str.replace(/(^s*)|(s*$)/g, "").length ==0){
            tips.style.color = "red";
            tips.innerHTML = "输入格式错误，不能输入空格";
            document.getElementById("name").style.border = "1px solid red";
            return;
        }else{
            if(str_length(str) >= 4 && str_length(str) <= 16){
                tips.style.color = "green";
                tips.innerHTML = "输入格式正确";
                document.getElementById("name").style.border = "1px solid green";
                return;
            }else{
                tips.style.color = "red";
                tips.innerHTML = "输入格式错误，应输入位数为4～16的字符";
                document.getElementById("name").style.border = "1px solid red";
                return;
            }
        }
    });
    function str_length(str) {
        var reg = "/[\u4E00-\u9FA5\uf900-\ufa2d]/";
        var count = 0;
        var str_l = str.length;
        for (var i = 0; i < str_l; i++) {
            if (str[i].match(reg)) {
                count += 2;
            } else {
                count += 1;
            }
        }
        return count;
    }
}
init();