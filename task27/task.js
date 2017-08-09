/**
 * Created by Administrator on 2017/8/7.
 */
var $ = function(id){
    return document.getElementById(id);
}
function addHandler(element, type, handler){
    // 防止有些浏览器不支持addEventListener
    if(element.addEventListener){
        element.addEventListener(type, handler, false);
    }else{
        element["on" + type] = handler;
    }
}
// 人类
function People(peopleId, speed, rest){
    this.id = peopleId;
    this.rest = rest;
    this.speed = speed;
    this.power = 100;
    this.state = "stop";
    this.timer = null;
}
People.prototype={
    constructor: People,
    receiveMsg: function(msg){
        var adapter = new Adapter();
        var msg = adapter.decode(msg);
        if(msg.id == this.id){
            flag = msg.msg;
            switch (flag){
                case "start":
                    this.powerDown();
                    this.state = "start";
                    this.start();
                    break;
                case "stop":
                    this.powerAdd();
                    this.state = "stop";
                    this.stop();
                    break;
                case "destroy":
                    this.destroy();
                    break;
            }
        }
    },
    start: function(){
        showRun("满血！" + (this.id + 1) + "号运动员已经起跑");
        var peoRun = document.querySelector("." + peopleArr[this.id]);
        peoRun.classList.add("start");
        peoRun.classList.add(this.speed);
    },
    stop: function(){
        showRun("辣鸡！" + (this.id + 1) + "号运动员在偷懒");
        var peoRun = document.querySelector("." + peopleArr[this.id]);
        peoRun.classList.remove("start");
    },
    destroy: function(){
        showRun("好了，别说了," + (this.id + 1) + "号运动员已经回家了");
        var id  = this.id;
        var peoRuns = document.querySelector("." + peopleArr[id]);
        peoRuns.classList.remove("start");
        clearInterval(this.timer);
        peoRuns.classList.remove(this.speed);
        peoRuns.classList.remove("people_come");
        document.getElementById(id).classList.add("li_hidden");
        for(var i = 0; i < runner.length; i++){
            if(runner[i].id == id){
                runner.splice(i, 1);
                break;
            }
        }
    },
    powerDown: function(){
        var speedArr = {
            speed_1: 900,
            speed_2: 600,
            speed_3: 300,
            speed_4: 100
        };
        var p = this;
        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer = setInterval(run, speedArr[this.speed]);
        function run(){
            if(p.power > 0){
                p.power = p.power - 1;
                var peoRun = document.querySelector("." + peopleArr[p.id]);
                peoRun.innerHTML = p.power + "%";
            }else{
                p.stop();
                p.state = "over";
                clearInterval(p.timer);
                p.powerAdd();
            }
        }
    },
    powerAdd: function(){
        var p = this;
        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer = setInterval(run, parseInt(this.rest));
        function run(){
            if(p.power < 100){
                p.power = p.power + 1;
                var peoRun = document.querySelector("." + peopleArr[p.id]);
                peoRun.innerHTML = p.power + "%";
            }else{
                if(p.state == "over"){
                    p.start();
                    p.state = "start";
                    clearInterval(p.timer);
                    p.powerDown();
                }else{
                    clearInterval(p.timer);
                }
            }
        }
    }
}
// 适配器
function Adapter(){}
Adapter.prototype={
    encode:function(msg){
        var str = "";
        var id = msg.id;
        var message = msg.message;
        switch (id){
            case "0":
                str += "00";
                break;
            case "1":
                str += "01";
                break;
            case "2":
                str += "10";
                break;
            case "3":
                str += "11";
                break;
        }
        switch (message){
            case "start":
                str += "0001";
                break;
            case "stop":
                str += "0010";
                break;
            case "destroy":
                str += "1100";
                break;
        }
        return str;
    },
    decode:function(msg){
        var str_id = "";
        var str_order = "";
        switch (msg.substring(0, 2)){
            case "00":
                str_id = 0;
                break;
            case "01":
                str_id = 1;
                break;
            case "10":
                str_id = 2;
                break;
            case "11":
                str_id = 3;
                break;
        }
        switch (msg.substring(2)){
            case "0001":
                str_order = "start";
                break;
            case "0010":
                str_order = "stop";
                break;
            case "1100":
                str_order = "destroy";
                break;
        }
        return{
            id: str_id,
            msg: str_order
        }
    }
}
// 信息发送
function Message(){}
Message.prototype={
    sendMsg: function(msg){
        var timer = null;
        var adapter = new Adapter();
        var msg = adapter.encode(msg);
        timer = setInterval(run, 300);
        function run(){
            var num = Math.floor(Math.random() * 10 + 1);
            if(num > 1){
                for (var i = 0; i < runner.length; i++) {
                    runner[i].receiveMsg(msg);
                }
                clearInterval(timer);
            }else{
                showRun("你说什么，没戴眼镜听不见！");
            }
        }
    }
}
// 放出不同的选手
function diffRunner(){}
diffRunner.prototype = {
    readyRunner: function () {
        var road = $("control_panel").querySelector(".li_hidden");
        if (road) {
            var id = road.getAttribute("id");
            var rest = $("selRest").options[$("selRest").selectedIndex].value;
            var speed = $("selSpeed").options[$("selSpeed").selectedIndex].value;
            console.log(id + speed + rest);
            runner.push(new People(id, speed, rest));
            var peoRun = document.querySelector("." + peopleArr[id]);
            peoRun.classList.add("people_come");
            peoRun.innerHTML = "100%";
            road.classList.remove("li_hidden");
            var btn = road.getElementsByTagName("button");
            for(var i = 0; i < btn.length; i++){
                addHandler(btn[i], "click", function(e){
                    btnHandler(e);
                });
            }
            showRun("运动员" + (id + 1) + "号达到战场，已做好准备");
        }else{
            showRun("没有闲置跑道，回家睡觉吧");
        }
    }
}
// 制造器
function Creator(){
    this.id = 0;
}
Creator.prototype={
    createMsg:function(id, msg){
        return{
            id: id,
            message: msg
        };
    }
}
function btnHandler(e){
    var message = new Message();
    var creator = new Creator();
    var msg = e.target.value;
    var id = e.target.parentNode.id;
    var create = creator.createMsg(id, msg);
    message.sendMsg(create);
}
// 跑况显示
function showRun(str){
    var msg = $("msg");
    msg.innerHTML += "<p>" + str + "</p>";
    console.log(str);
}

var runner = [];
// id和类名对应
var peopleArr = ["people_1", "people_2", "people_3", "people_4"];
var diffRun = new diffRunner();
var btn_run = document.getElementById("people_come");
btn_run.addEventListener("click", function(e){
    diffRun.readyRunner();
});