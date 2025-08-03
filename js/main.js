document.addEventListener("DOMContentLoaded", function () {
    const text = document.getElementById("result");
    let firstNumber = null;
    let secondNumber = null;
    let operator = null;
    let shouldClear = false;

    function formatResult(num, decimals = 2) {
        return Number(num.toFixed(decimals));
    }

    document.querySelectorAll(".btn__num").forEach((number) => {
        number.addEventListener("click", function() {
            if (shouldClear) {
                text.value = "";
                shouldClear = false;
            }
            if (this.id === "btn__zero" && text.value === "0") {
                return;
            }
            text.value += this.textContent;
        });
    });

    document.querySelector(".btn__dot").addEventListener("click", function() {
        if (shouldClear) {
            text.value = "";
            shouldClear = false;
        }
        if (text.value === "") {
            text.value = "0.";
        } else if (!text.value.includes(".")) {
            text.value += this.textContent;
        }
    });

    document.querySelectorAll(".btn__oper").forEach((oper) => {
        oper.addEventListener("click", function() {
            const op = this.textContent;
            if (["+", "-", "*", "/", "^", "mod"].includes(op)) {
                if (text.value !== "") {
                    firstNumber = parseFloat(text.value);
                    operator = op;
                    text.value = "";
                }
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
                        firstNumber = secondNumber = operator = null;
                        shouldClear = true;
                        return;
                    }
                    break;
                case "^":
                    result = Math.pow(firstNumber, secondNumber);
                    break;
                case "mod":
                    result = firstNumber % secondNumber;
                    break;
            }
            text.value = formatResult(result);
            firstNumber = secondNumber = operator = null;
            shouldClear = true;
        }
    });

    document.querySelector(".main__container > .btn__cancel").addEventListener("click", function() {
        text.value = "";
        firstNumber = secondNumber = operator = null;
        shouldClear = false;
    });

    function handleUnary(fn, validate = () => true) {
        return () => {
            const val = parseFloat(text.value);
            if (text.value === "" || text.value === "Error" || isNaN(val) || !validate(val)) {
                text.value = "Error";
            } else {
                text.value = formatResult(fn(val));
            }
            firstNumber = operator = null;
            shouldClear = true;
        };
    }

    document.getElementById("btn__sqrt").addEventListener("click", handleUnary(
        x => Math.sqrt(x), x => x >= 0
    ));
    document.getElementById("btn__cbrt").addEventListener("click", handleUnary(
        x => Math.cbrt(x)
    ));
    document.getElementById("btn__square").addEventListener("click", handleUnary(
        x => Math.pow(x, 2)
    ));
    document.getElementById("btn__cube").addEventListener("click", handleUnary(
        x => Math.pow(x, 3)
    ));
    document.getElementById("btn__exp").addEventListener("click", handleUnary(
        x => Math.exp(x)
    ));
    document.getElementById("btn__abs").addEventListener("click", handleUnary(
        x => Math.abs(x)
    ));
    document.getElementById("btn__plusMinus").addEventListener("click", handleUnary(
        x => -x
    ));
    document.getElementById("btn__log").addEventListener("click", handleUnary(
        x => Math.log10(x), x => x > 0
    ));
    document.getElementById("btn__ln").addEventListener("click", handleUnary(
        x => Math.log(x), x => x > 0
    ));

    function factorial(n) {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }
    document.getElementById("btn__factorial").addEventListener("click", handleUnary(
        factorial,
        x => x >= 0 && Number.isInteger(x)
    ));

    ["sin", "cos", "tan", "asin", "acos", "atan"].forEach(fnName => {
        document.getElementById(`btn__${fnName}`).addEventListener("click",
            handleUnary(val => Math[fnName](val))
        );
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (isDigit(key)) handleDigit(key);
        else if (isOperator(key)) handleOperator(key);
        else if (key === "Backspace") handleBackspace();
        else if (key === "Delete") handleDelete();
        else if (key === "." || key === ",") handleDecimal();
        else if (key === "Enter") handleEnter();
    });

    function isDigit(key) {
        return /\d/.test(key);
    }

    function isOperator(key) {
        return ['+', '-', '*', '/'].includes(key);
    }

    function handleDigit(key) {
        if (shouldClear) {
            text.value = "";
            shouldClear = false;
        }
        if (key === "0" && text.value === "0") return;
        text.value += key;
    }

    function handleOperator(key) {
        if (text.value !== "") {
            firstNumber = parseFloat(text.value);
            operator = key;
            text.value = "";
        }
    }

    function handleBackspace() {
        if (shouldClear) {
            text.value = "";
            shouldClear = false;
        } else {
            text.value = text.value.slice(0, -1);
        }
    }

    function handleDelete() {
        text.value = "";
        firstNumber = null;
        secondNumber = null;
        operator = null;
        shouldClear = false;
    }

    function handleDecimal() {
        if (shouldClear) {
            text.value = "";
            shouldClear = false;
        }
        if (text.value === "") {
            text.value = "0.";
        } else if (!text.value.includes(".")) {
            text.value += ".";
        }
    }

    function handleEnter() {
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
                case "^":
                    result = Math.pow(firstNumber, secondNumber);
                    break;
                case "mod":
                    result = firstNumber % secondNumber;
                    break;
            }
            text.value = formatResult(result);
            firstNumber = null;
            secondNumber = null;
            operator = null;
            shouldClear = true;
        }
    }
});