function submit() {
    mode = document.querySelector('input[name = "difficulty"]:checked').value;
    if (mode === "short") {
        count = 5;
    }
    if (mode === "medium") {
        count = 10;
    }
    if (mode === "long") {
        count = 20;
    }
    document.getElementById("form").style.display = "none";
    document.getElementById("game").style.display = "flex";
    main();
}

function getQuestions() {
    let operators = ["+", "-", "x", "x", "x"];
    let maxNumber;

    for (let i = 0; i < count; i++) {
        operator = operators[Math.floor(Math.random() * operators.length)];
        if (operator === "-") {
            maxNumber = 20;
        }
        else {
            maxNumber = 9;
        }
        let numbers = [
            Math.round(Math.random() * maxNumber),
            Math.round(Math.random() * maxNumber)
        ];

        let firstNumber = numbers[0] >= numbers[1] ? numbers[0] : numbers[1];
        let secondNumber = numbers[0] <= numbers[1] ? numbers[0] : numbers[1];
        let answer = 0;
        switch (operator) {
            case "x":
                answer = firstNumber * secondNumber;
                break;
            case "+":
                answer = firstNumber + secondNumber;
                break;
            case "-":
                answer = firstNumber - secondNumber;
                break;
        }
        questions.push({
            firstNumber,
            operator,
            secondNumber,
            answer
        });

    }
}

function next() {
    if (question !== count) {
        question++;
    }
    play();
}

function set(id, value) {
    let elem = document.getElementById(id);
    if (!elem) return;
    if (elem.value === undefined)
        elem.innerHTML = value;
    else
        elem.value = value;
}

function get(id) {
    let elem = document.getElementById(id);
    if (!elem) return null;
    return elem.value;
}

function disable(id) {
    document.getElementById(id).disabled = true;
}

function fill(number, obj) {
    if (obj) {
        set("firstnumber" + number, obj.firstNumber);
        set("operator" + number, obj.operator);
        set("secondnumber" + number, obj.secondNumber);
        set("equals" + number, "=");
    } else {
        set("firstnumber" + number, "");
        set("operator" + number, "");
        set("secondnumber" + number, "");
        set("equals" + number, "");
    }
}

function play() {
    fill("1", questions[question + 1]);
    fill("2", questions[question]);
    fill("3", questions[question - 1]);

    if (question !== count) {
        set("previousanswer", get("currentbox"));
    } else {
        disable("currentbox");
    }

    set("currentbox", "")

    if (question === count) {
        finishtime = new Date;
        finishtime = finishtime.getTime();
        let millitotaltime = (finishtime - starttime) / 1000;
        let totaltime = parseFloat(millitotaltime).toFixed(2);
        document.getElementById("game").style.display = "none";
        popup(`    You completed <span class="number">${mode}</span> mode and got <span
        class="number">${correct}</span> question(s) correct and <span class="number">${incorrect}</span>
    question(s) incorrect in <span class="number">${totaltime}</span> seconds`, [
            {
                text: "RESTART",
                action: "refresh",
                class: "alertbutton"
            }
        ])
    }

}

function refresh() {
    location = location
}

function check() {
    if (parseInt(get("currentbox")) === questions[question].answer) {
        correct++;
        document.getElementById("tick").style.display = "inline";
        document.getElementById("cross").style.display = "none";
    }
    else {
        incorrect++;
        document.getElementById("cross").style.display = "inline";
        document.getElementById("tick").style.display = "none";
    }
}

function main() {
    document.getElementById("currentbox").focus();
    starttime = new Date;
    starttime = starttime.getTime();
    getQuestions();
    play();
    document.getElementById("currentbox")
        .addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                check();
                next();
            }
        })
}
let questions = [];
let question = 0;
let correct = 0;
let incorrect = 0;
let count = 0;
let mode = "";