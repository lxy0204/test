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
    this.Messages = {
        receive: function(msg){
            var message = this.Aadpter.decode(msg);
            if(message.id == this.id){
                flag = message.msg;
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
        }.bind(this),
        send: function(){
            var p = this;
            var information = {
                id: p.id,
                speed: p.speed,
                rest: p.rest,
                state: p.state,
                power: p.power
            }
            var sign = this.Aadpter.encode(information);
            var bus = new Bus();
            bus.receive(sign, "go");
        }.bind(this)
    };
    this.Aadpter = {
        decode : function(msg){
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
        },
        encode: function(msg){
            var str = "";
            var id = msg.id;
            var speed = msg.speed;
            var rest = msg.rest;
            var state = msg.state;
            var power = msg.power;
            switch (id){
                case 0:
                    str += "000";
                    break;
                case 1:
                    str += "001";
                    break;
                case 2:
                    str += "010";
                    break;
                case 3:
                    str += "011";
                    break;
            }
            switch (speed){
                case "speed_1":
                    str += "000";
                    break;
                case "speed_2":
                    str += "001";
                    break;
                case "speed_3":
                    str += "010";
                    break;
                case "speed_4":
                    str += "011";
                    break;
            }
            switch (rest){
                case "900":
                    str += "000";
                    break;
                case "600":
                    str += "001";
                    break;
                case "300":
                    str += "010";
                    break;
                case "100":
                    str += "011";
                    break;
            }
            switch (state){
                case "start":
                    str += "0001";
                    break;
                case "stop":
                    str += "0010";
                    break;
                case "destroy":
                    str += "1100";
                    break;
                case "over":
                    str += "1111";
                    break;
            }
            if(0 < power < 100){
                power = "0" + power;
                str += power;
            }else if(power == 100){
                str += "100";
            }else if(power == 0){
                str += "000";
            }
            return str;
        }
    }
}
People.prototype = {
    constructor: People,
    start: function(){
        showRun("满血！" + (this.id + 1) + "号运动员已经起跑");
        var peoRun = document.querySelector("." + peopleArr[this.id]);
        peoRun.classList.add("start");
        peoRun.classList.add(this.speed);
        this.Messages.send();
    },
    stop: function(){
        showRun("辣鸡！" + (this.id + 1) + "号运动员在偷懒");
        var peoRun = document.querySelector("." + peopleArr[this.id]);
        peoRun.classList.remove("start");
        this.Messages.send();
    },
    destroy: function(){
        showRun("好了，别说了," + (this.id + 1) + "号运动员已经回家了");
        var id  = this.id;
        var peoRuns = document.querySelector("." + peopleArr[id]);
        peoRuns.classList.remove("start");
        clearInterval(this.timer);
        peoRuns.classList.remove(this.speed);
        peoRuns.classList.remove("people_come");
        this.state = "destroy";
        this.power = 0;
        this.Messages.send();
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
            p.Messages.send();
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
            p.Messages.send();
        }
    }
}
// 跑道信号收发器
function Message(){
    var instance = this;
    Message = function(){
        return instance;
    };
    // 收发器上的信号适配器
    this.Aadpter = {
        encode: function(msg){
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
        decode: function(sign){
            var id, speed, rest, state, power;
            switch (sign.substring(0, 3)){
                case "000":
                    id = "1";
                    break;
                case "001":
                    id = "2";
                    break;
                case "010":
                    id = "3";
                    break;
                case "011":
                    id = "4";
                    break;
            }
            switch (sign.substring(3, 6)){
                case "000":
                    speed = "散步";
                    break;
                case "001":
                    speed = "龟速";
                    break;
                case "010":
                    speed = "跑步";
                    break;
                case "011":
                    speed = "飞";
                    break;
            }
            switch (sign.substring(6, 9)){
                case "000":
                    rest = "用心偷懒";
                    break;
                case "001":
                    rest = "偷偷偷懒";
                    break;
                case "010":
                    rest = "偷个小懒";
                    break;
                case "011":
                    rest = "假装偷懒";
                    break;
            }
            switch (sign.substring(9, 13)){
                case "0001":
                    state = "开始";
                    break;
                case "0010":
                    state = "暂停";
                    break;
                case "1100":
                    state = "原地爆炸";
                    break;
                case "1111":
                    state = "吃个香蕉";
                    break;
            }
            power = parseInt(sign.substring(13));
            return{
                id: id,
                speed: speed,
                rest: rest,
                state: state,
                power: power
            };
        }
    }
}
Message.prototype = {
    sendMsg: function(msg){
        var message = this.Aadpter.encode(msg);
        var bus = new Bus();
        bus.receive(message, "back");
    },
    receiveMsg: function(sign){
        var flag = this.Aadpter.decode(sign);
        var dc = new DC();
        dc.receive(flag);
    }
}
// BUS实例
function Bus(){
    // 缓存实例
    var instance = this;
    // 重构构造函数
    Bus = function(){
        return instance;
    };
}
Bus.prototype = {
    // back表示从跑道回来，go表示从这里发去跑道
    receive: function(msg, sign){
        if(sign == "back"){
            var timer = null;
            timer = setInterval(run, 300);
            function run(){
                var num = Math.floor(Math.random() * 10 + 1);
                if(num > 1){
                    for(var i = 0; i < runner.length; i++){
                        runner[i].Messages.receive(msg);
                    }
                    clearInterval(timer);
                }else{
                    showRun("你说什么，我没戴眼镜听不见~");
                }
            }
        }else if(sign == "go"){
            var message = new Message();
            message.receiveMsg(msg);
        }else{
            showRun("你说什么，被风吹走了，听不见");
        }
    }
}
// 放出不同的选手
function diffRunner(){}
diffRunner.prototype = {
    readyRunner: function(){
        var road = $("control_panel").querySelector(".li_hidden");
        if (road) {
            var id = parseInt(road.getAttribute("id"));
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
    createMsg: function(id, msg){
        return{
            id: id,
            message: msg
        };
    }
}
// 显示跑道信息
function DC(){
    var instance = this;
    DC = function(){
        return instance;
    };
}
DC.prototype = {
    receive: function(sign){
        var show;
        switch (sign.id){
            case "1":
                show = $("show_1");
                break;
            case "2":
                show = $("show_2");
                break;
            case "3":
                show = $("show_3");
                break;
            case "4":
                show = $("show_4");
                break;
        }
        show.innerHTML = "<td>" + sign.id +"号运动员</td>" + "<td>" + sign.speed + "</td>" + "<td>" + sign.rest + "</td>"
        + "<td>" + sign.state + "</td>" + "<td>" + sign.power + "</td>";
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