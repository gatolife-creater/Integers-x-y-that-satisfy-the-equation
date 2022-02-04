let reload_button;
let dark_mode_switch;
let dark_mode_flag = false;
window.addEventListener("load", function() {
    main();
    reload_button = document.getElementById("reload_button");
    reload_button.addEventListener("click", function() {
        location.reload();
    });
    dark_mode_switch = document.getElementsByClassName("switchArea")[0];
    dark_mode_switch.onchange = function() {
        if (dark_mode_flag) {
            dark_mode_flag = false;
            document.getElementsByTagName("body")[0].style = "background-color:white;color:black;";
            dark_mode_switch.style = "background-color:white;";
        } else if (!dark_mode_flag) {
            dark_mode_flag = true;
            document.getElementsByTagName("body")[0].style = "background-color:black;color:gray;";
            dark_mode_switch.style = "background-color:black;";
        }
    };

});


const random = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;


function setSmallNum(n) {
    // !n --> nが0もしくは宣言されていない
    while (!n) n = random(-2, 2) | 0;
    return n;
}

function setMiddleNum(n) {
    while (!n) n = random(-9, 9) | 0;
    return n;
}

function setLargeNum(n) {
    while (!n) n = random(-50, 50) | 0;
    return n;
}

function toEquation(a, b, c, d, e) {
    // a
    a = (a + "").replace("1", "");
    // b
    (b > 0) ? b = ("+" + b).replace("1", ""): b = (b + "").replace("1", "");
    // c
    (c > 0) ? c = ("+" + c).replace("1", ""): c = (c + "").replace("1", "");
    // d
    if (d > 0) d = "+" + d;
    // e
    e = e + "";

    let equation = `${a}xy${b}x${c}y${d}=${e}`;
    return equation;
}

function solveAnEquation(a, b, c, d, e) {
    // 計算をする際に、dは右辺に移行することになるので、最大の値は必ず
    let max = 5000;
    let answer = [];
    for (let x = -max; x <= max; x++) {
        for (let y = -max; y <= max; y++) {
            if ((a * x * y) + (b * x) + (c * y) == e - d) answer.push([x, y]);
        }
    }
    return answer;
}

function main() {
    let a, b, c, d, e;
    a = setSmallNum(a);
    b = setMiddleNum(b);
    c = setMiddleNum(c);
    d = setLargeNum(d);
    e = setLargeNum(e);
    if (a % 2 == 0 && b % 2 == 1) main();
    let answer = solveAnEquation(a, b, c, d, e);

    console.log(answer);
    let number = document.getElementsByTagName("summary")[0];
    number.innerText = `答えを見る:${answer.length}個`;

    // 答えの一覧を表示
    let answer_elem = document.getElementById("answer");
    for (let i = 0; i < answer.length; i++) {
        let new_elem = document.createElement("div");
        console.log(answer[i]);
        new_elem.innerText = `(${answer[i]})`;
        answer_elem.appendChild(new_elem);
    }
    let equation = toEquation(a, b, c, d, e);

    let display = document.getElementById("display");
    display.textContent = equation;
}