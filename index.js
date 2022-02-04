let reload_button;
window.addEventListener("load", function() {
    main();
    reload_button = document.getElementById("reload_button");
    reload_button.addEventListener("click", function() {
        location.reload();
    });
});

const random = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;




function setSmallNum(n) {
    // !n --> nが0もしくは宣言されていない
    while (!n) {
        n = random(-2, 2) | 0;
    }
    return n;
}

function setMiddleNum(n) {
    while (!n) {
        n = random(-9, 9) | 0;
    }
    return n;
}

function setLargeNum(n) {
    while (!n) {
        n = random(-50, 50) | 0;
    }
    return n;
}

function toEquation(a, b, c, d, e) {

    // a
    a = (a + "").replace("1", "");
    // b
    if (b > 0) {
        b = ("+" + b).replace("1", "");
    } else {
        b = (b + "").replace("1", "");
    }
    // c
    if (c > 0) {
        c = ("+" + c).replace("1", "");
    } else {
        c = (c + "").replace("1", "");
    }
    // d
    if (d > 0) {
        d = "+" + d;
    }
    // e
    e = e + "";

    let equation = `${a}xy${b}x${c}y${d}=${e}`;
    return equation;
}

function solveAnEquation(a, b, c, d, e) {
    let max = e - d;
    let answer = [];
    for (let x = -max; x <= max; x++) {
        if (x == 0) continue;
        for (let y = -max; y <= max; y++) {
            if (y == 0) continue
            if ((a * x * y) + (b * x) + (c * y) == e - d) {
                answer.push([x, y]);
            }
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
    if (a % 2 == 0 && b % 2 == 1) {
        main();
    }
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