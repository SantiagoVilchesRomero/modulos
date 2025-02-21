// Time line funtionality
// Buttons plan 1
var p1Btn1 = document.getElementById("p1Btn1");
var p1Btn2 = document.getElementById("p1Btn2");
var p1Btn3 = document.getElementById("p1Btn3");
var p1Btn4 = document.getElementById("p1Btn4");
// Buttons plan 2
var p2Btn1 = document.getElementById("p2Btn1");
var p2Btn2 = document.getElementById("p2Btn2");
var p2Btn3 = document.getElementById("p2Btn3");
var p2Btn4 = document.getElementById("p2Btn4");
var p2Btn5 = document.getElementById("p2Btn5");
// Buttons plan 3
var p3Btn1 = document.getElementById("p3Btn1");
var p3Btn2 = document.getElementById("p3Btn2");
var p3Btn3 = document.getElementById("p3Btn3");
var p3Btn4 = document.getElementById("p3Btn4");
var p3Btn5 = document.getElementById("p3Btn5");
var p3Btn6 = document.getElementById("p3Btn6");

// Time line 1
p1Btn1.onclick = () => {
    p1Btn1.classList.add('dayActive');
    p1Btn2.classList.remove('dayActive');
    p1Btn3.classList.remove('dayActive');
    p1Btn4.classList.remove('dayActive');
    switchContent('p1', 'plan1Day1');
}

p1Btn2.onclick = () => {
    p1Btn1.classList.remove('dayActive');
    p1Btn2.classList.add('dayActive');
    p1Btn3.classList.remove('dayActive');
    p1Btn4.classList.remove('dayActive');
    switchContent('p1', 'plan1Day2');
}

p1Btn3.onclick = () => {
    p1Btn1.classList.remove('dayActive');
    p1Btn2.classList.remove('dayActive');
    p1Btn3.classList.add('dayActive');
    p1Btn4.classList.remove('dayActive');
    switchContent('p1', 'plan1Day3');
}

p1Btn4.onclick = () => {
    p1Btn1.classList.remove('dayActive');
    p1Btn2.classList.remove('dayActive');
    p1Btn3.classList.remove('dayActive');
    p1Btn4.classList.add('dayActive');
    switchContent('p1', 'plan1Day4');
}

// Time line 2
p2Btn1.onclick = () => {
    p2Btn1.classList.add('dayActive');
    p2Btn2.classList.remove('dayActive');
    p2Btn3.classList.remove('dayActive');
    p2Btn4.classList.remove('dayActive');
    p2Btn5.classList.remove('dayActive');
    switchContent('p2', 'plan2Day1');
}

p2Btn2.onclick = () => {
    p2Btn1.classList.remove('dayActive');
    p2Btn2.classList.add('dayActive');
    p2Btn3.classList.remove('dayActive');
    p2Btn4.classList.remove('dayActive');
    p2Btn5.classList.remove('dayActive');
    switchContent('p2', 'plan2Day2');
}

p2Btn3.onclick = () => {
    p2Btn1.classList.remove('dayActive');
    p2Btn2.classList.remove('dayActive');
    p2Btn3.classList.add('dayActive');
    p2Btn4.classList.remove('dayActive');
    p2Btn5.classList.remove('dayActive');
    switchContent('p2', 'plan2Day3');
}

p2Btn4.onclick = () => {
    p2Btn1.classList.remove('dayActive');
    p2Btn2.classList.remove('dayActive');
    p2Btn3.classList.remove('dayActive');
    p2Btn4.classList.add('dayActive');
    p2Btn5.classList.remove('dayActive');
    switchContent('p2', 'plan2Day4');
}

p2Btn5.onclick = () => {
    p2Btn1.classList.remove('dayActive');
    p2Btn2.classList.remove('dayActive');
    p2Btn3.classList.remove('dayActive');
    p2Btn4.classList.remove('dayActive');
    p2Btn5.classList.add('dayActive');
    switchContent('p2', 'plan2Day5');
}

// Time line 3
p3Btn1.onclick = () => {
    p3Btn1.classList.add('dayActive');
    p3Btn2.classList.remove('dayActive');
    p3Btn3.classList.remove('dayActive');
    p3Btn4.classList.remove('dayActive');
    p3Btn5.classList.remove('dayActive');
    p3Btn6.classList.remove('dayActive');
    switchContent('p3', 'plan3Day1');
}

p3Btn2.onclick = () => {
    p3Btn1.classList.remove('dayActive');
    p3Btn2.classList.add('dayActive');
    p3Btn3.classList.remove('dayActive');
    p3Btn4.classList.remove('dayActive');
    p3Btn5.classList.remove('dayActive');
    p3Btn6.classList.remove('dayActive');
    switchContent('p3', 'plan3Day2');
}

p3Btn3.onclick = () => {
    p3Btn1.classList.remove('dayActive');
    p3Btn2.classList.remove('dayActive');
    p3Btn3.classList.add('dayActive');
    p3Btn4.classList.remove('dayActive');
    p3Btn5.classList.remove('dayActive');
    p3Btn6.classList.remove('dayActive');
    switchContent('p3', 'plan3Day3');
}

p3Btn4.onclick = () => {
    p3Btn1.classList.remove('dayActive');
    p3Btn2.classList.remove('dayActive');
    p3Btn3.classList.remove('dayActive');
    p3Btn4.classList.add('dayActive');
    p3Btn5.classList.remove('dayActive');
    p3Btn6.classList.remove('dayActive');
    switchContent('p3', 'plan3Day4');
}

p3Btn5.onclick = () => {
    p3Btn1.classList.remove('dayActive');
    p3Btn2.classList.remove('dayActive');
    p3Btn3.classList.remove('dayActive');
    p3Btn4.classList.remove('dayActive');
    p3Btn5.classList.add('dayActive');
    p3Btn6.classList.remove('dayActive');
    switchContent('p3', 'plan3Day5');
}

p3Btn6.onclick = () => {
    p3Btn1.classList.remove('dayActive');
    p3Btn2.classList.remove('dayActive');
    p3Btn3.classList.remove('dayActive');
    p3Btn4.classList.remove('dayActive');
    p3Btn5.classList.remove('dayActive');
    p3Btn6.classList.add('dayActive');
    switchContent('p3', 'plan3Day6');
}



function switchContent(plan, active) {
    if (plan == 'p1') {
        let arrayP1 = ['content1', 'plan1Day1', 'plan1Day2', 'plan1Day3', 'plan1Day4'];
        for (const cnt of arrayP1) {
            if (cnt == active) {
                document.getElementById(active).classList.remove('dayHidden');
            } else {
                document.getElementById(cnt).classList.add('dayHidden');
            }
        }
    } else if (plan == 'p2') {
        let arrayP1 = ['content2', 'plan2Day1', 'plan2Day2', 'plan2Day3', 'plan2Day4', 'plan2Day5'];
        for (const cnt of arrayP1) {
            if (cnt == active) {
                document.getElementById(active).classList.remove('dayHidden');
            } else {
                document.getElementById(cnt).classList.add('dayHidden');
            }
        }
    } else {
        let arrayP1 = ['content3', 'plan3Day1', 'plan3Day2', 'plan3Day3', 'plan3Day4', 'plan3Day5', 'plan3Day6'];
        for (const cnt of arrayP1) {
            if (cnt == active) {
                document.getElementById(active).classList.remove('dayHidden');
            } else {
                document.getElementById(cnt).classList.add('dayHidden');
            }
        }
    }
}