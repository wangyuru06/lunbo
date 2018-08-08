var next = document.getElementById("next");
var list = document.getElementById("list");
var pre = document.getElementById("pre");
var pan = document.getElementById("cont");
var buttons = document.getElementById("but").getElementsByTagName("span");
var len = 5;
var index = 1;
var interval = 3000;
var animated = false;
var timer;

next.onclick = function() {
    if (index == 5) {
        index = 1;
    } else {
        index += 1;
    }
    btn()
    if (!animated) {
        animate(-600);
    }
}
pre.onclick = function() {
    if (index == 1) {
        index = 5;
    } else {
        index -= 1;
    }
    btn();
    if (!animated) {
        animate(600);
    }
}

function autoPlay() {
    timer = setInterval(function() {
        next.onclick();
    }, interval);
}

function stop() {
    clearInterval(timer);
}

pan.onmouseover = stop;
pan.onmouseout = autoPlay;
autoPlay();

//按钮切换样式
function btn() {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].className == "on") {
            buttons[i].className = "";
            break;
        }
    }
    buttons[index - 1].className = "on";
}

function animate(offset) {
    if (offset == 0) {
        return;
    }
    animated = true;
    var newLeft = parseInt(list.style.left) + offset;
    var time = 30; //位移总时间
    var interval = 3; //位移间隔时间
    var speed = offset / (time / interval); //每次位移量
    function go() {
        if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
            list.style.left = parseInt(list.style.left) + speed + 'px';
            setTimeout(go, interval);
        } else {
            list.style.left = newLeft + 'px';
            /*如果当前是第五张图，就跳到第一张图*/
            if (newLeft > -200) {
                list.style.left = -600 * len + 'px';
            }
            if (newLeft < (-600 * len)) {
                list.style.left = '-600px';
            }
            animated = false;
        }
    }
    go();
}


/*按钮切换*/
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        if (animated) {
            return false;
        }
        if (this.className == "on") {
            return false;
        }
        var myIndex = parseInt(this.getAttribute("index"));
        var offset = 600 * (myIndex - index);
        animate(offset);
        index = myIndex;
        btn();
    }
}