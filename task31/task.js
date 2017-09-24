/**
 * Created by Administrator on 2017/8/2.
 */
function init(){
    document.getElementById("stu").addEventListener("click", student);
    document.getElementById("not_stu").addEventListener("click", no_student);
    document.getElementById("province").addEventListener("change", change);
}
function student(){
    document.getElementById("school_stu").style.display = "block";
    document.getElementById("no_stu").style.display = "none";
}
function no_student(){
    document.getElementById("school_stu").style.display = "none";
    document.getElementById("no_stu").style.display = "block";
}
function change(){
    var province = document.getElementById("province");
    var school = document.getElementById("school");
    var shcool_list =  [
        ["北京大学", "清华大学", "北京航空航天大学", "北京理工大学", "北京科技大学"],
        ["中山大学", "深圳大学", "暨南大学", "华南理工大学"],
        ["复旦大学", "同济大学", "上海交通大学", "上海理工大学"],
        ["山东大学", "济南大学", "山东农业大学", "山东理工大学", "烟台大学"],
    ];
    var pro_school = shcool_list[province.selectedIndex-1];
    for(var i = 0; i < pro_school.length; i++){
        //Option构造器，用于产生一个HTMLOptionElement。
        school[i + 1] = new Option(pro_school[i], pro_school[i]);
    }
}
init();