let text = document.getElementById("result");
let firstNumber = null;
let secondNumber = null;
let operator = null;
let shouldClear = false;
let btnMore = document.getElementById("more-operations");

function roundTo(num, decimals = 2) {
    return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

document.querySelectorAll(".btn__num").forEach((number) => {
    number.addEventListener("click", function() {
        if (shouldClear) {
            text.value = "";
            shouldClear = false;
        }
        text.value += this.textContent;
    });
});

document.querySelector(".btn__dot").addEventListener("click", function() {
    if (shouldClear) {
        text.value = "";
        shouldClear = false;
    }
    if (!text.value.includes(".")) {
        text.value += this.textContent;
    }
});

document.querySelectorAll(".btn__oper").forEach((oper) => {
    oper.addEventListener("click", function() {
        if (text.value !== "") {
            firstNumber = parseFloat(text.value);
            operator = this.textContent;
            text.value = "";
        }
    });
});

document.querySelector(".btn__result").addEventListener("click", function() {
    if (text.value !== "" && firstNumber !== null && operator !== null) {
        secondNumber = parseFloat(text.value);
        let result = 0;

        switch (operator) {
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                result = firstNumber - secondNumber;
                break;
            case "*":
                result = firstNumber * secondNumber;
                break;
            case "/":
                if (secondNumber !== 0) {
                    result = firstNumber / secondNumber;
                } else {
                    text.value = "Error";
                    firstNumber = null;
                    secondNumber = null;
                    operator = null;
                    shouldClear = true;
                    return;
                }
                break;
        }
        text.value = roundTo(result);
        firstNumber = null;
        secondNumber = null;
        operator = null;
        shouldClear = true;
    }
});

document.querySelector(".btn__cancel").addEventListener("click", function() {
    text.value = "";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    shouldClear = false;
});

document.querySelector(".btn__more").addEventListener("click", function () {
    if (btnMore.style.display === "none" || btnMore.style.display === "") {
        btnMore.style.display = "grid";
    } else {
        btnMore.style.display = "none";
    }
})