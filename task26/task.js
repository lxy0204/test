/**
 * Created by Administrator on 2017/8/7.
 */
var $ = function(id){
    return document.getElementById(id);
}
function addHandler(element, type, handler){
    if(element.addEventListener){
        element.addEventListener(type, handler, false);
    }else if(element.attachEvent){
        element.attachEvent("on" + type, handler);
    }else{
        element["on" + type] = handler;
    }
}
// 人类
function People(peopleId, onRoad){
    this.id = peopleId;
    this.onRoad = onRoad;
    this.power = 100;
    this.state = "stop";
    this.timer = null;
}
People.prototype={
    constructor: People,
    receiveMsg: function(msg){
        if(msg.id == this.id){
            flag = msg.message;
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
    },
    stop: function(){
        showRun("辣鸡！" + (this.id + 1) + "号运动员在偷懒");
        var peoRun = document.querySelector("." + peopleArr[this.id]);
        peoRun.classList.remove("start");
    },
    destroy: function(){
        showRun("好了，别说了," + (this.id + 1) + "号运动员已经回家了");
        var peoRun = document.querySelector("." + peopleArr[this.id]);
        peoRun.classList.remove("start");
        clearInterval(this.timer);
        var id  = this.id;
        var peoRuns = document.querySelector("." + peopleArr[id]);
        peoRuns.classList.remove("people_come");
        document.getElementById(id).classList.add("li_hidden");
        for(var i = 0; i < runner.length; i++){
            if(runner[i].id == id){
                runner[i].onRoad = "off";
                runner[i].power = 100;
                runner[i].state = "stop";
            }
        }
    },
    powerDown: function(){
        var p = this;
        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer = setInterval(run, 100);
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
        this.timer = setInterval(run, 300);
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
    },
    createPeople:function(){
        for(var i = 0; i < runner.length; i++){
            if (runner[i].onRoad == "off"){
                var id = runner[i].id;
                runner[i].onRoad = "on";
                // 跑者上相应跑道
                var peoRun = document.querySelector("." + peopleArr[id]);
                peoRun.classList.add("people_come");
                peoRun.innerHTML = runner[i].power + "%";
                var panel = document.getElementById(id);
                panel.classList.remove("li_hidden");
                var btns = panel.getElementsByTagName("button");
                for(var j = 0; j < btns.length; j++){
                    addHandler(btns[j], "click", function (e){
                        btnHandler(e);
                    });
                }
                showRun("运动员" + (id + 1) + "号已经到达战场，请做好准备");
                break;
            }
        }
    }
}
// 信息发送
function Message(){}
Message.prototype={
    sendMsg: function(msg){
        for (var i = 0; i < runner.length; i++) {
            if (runner[i].onRoad == "on") {
                runner[i].receiveMsg(msg);
            }
        }
    }
}
// 跑况显示
function showRun(str){
    var msg = $("msg");
    msg.innerHTML += "<p>" + str + "</p>";
}
function btnHandler(e){
    var message = new Message();
    var creator = new Creator();
    var msg = e.target.value;
    var id = e.target.parentNode.id;
    var create = creator.createMsg(id, msg);
    setTimeout(function(){
        message.sendMsg(create)
    }, 1000);
}
// 一次性只能有4个人
var runner = [];
for(var i = 0; i < 4; i++){
    var people = new People(i, "off");
    runner.push(people);
}
// id和类名对应
var peopleArr = ["people_1", "people_2", "people_3", "people_4"];
var creator = new Creator();
var btn = document.getElementById("people_come");
btn.addEventListener("click", function(e){
    creator.createPeople();
});