document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const heading = document.getElementById("heading");
    const wrapper = document.querySelector(".wrapper")
    const [calcSwitch, unitConvSwitch, currConvSwitch] = [
        document.getElementById("calc__switch"),
        document.getElementById("unit_conv__switch"),
        document.getElementById("curr_conv__switch")
    ];
    const [mainCalcContainer, unitConvContainer, currConvContainer] = [
        document.querySelector(".main_calc__container"),
        document.querySelector(".unit_conv__container"),
        document.querySelector(".curr_conv__container")
    ];
    const text = document.getElementById("result");
    const [topLeftSign, topRightSign, bottomLeftSign, bottomRightSign] = [
        document.getElementById("top-left__sign"),
        document.getElementById("top-right__sign"),
        document.getElementById("bottom-left__sign"),
        document.getElementById("bottom-right__sign")
    ];
    const calcMoreBtn = document.querySelector(".more__container .btn__more");
    const moreOperations = document.getElementById("more__operations");
    const switchCalcBtn = document.getElementById("calc__switch");
    const switchUnitConvBtn = document.getElementById("unit_conv__switch");
    const switchCurrConvBtn = document.getElementById("curr_conv__switch");
    const flipBoxes = document.querySelectorAll('.design__signs');

    let firstNumber = null;
    let secondNumber = null;
    let operator = null;
    let shouldClear = false;

    function formatResult(num, decimals = 2) {
        return Number(num.toFixed(decimals));
    }

    function startFlip() {
        flipBoxes.forEach(box => {
            box.classList.remove("animate");
            void box.offsetWidth;
            box.classList.add("animate");
        })
    }

    function updateAppState(state) {
        if (state === "calc") {
            mainCalcContainer.classList.add("active");
            mainCalcContainer.classList.remove("disabled");
            unitConvContainer.classList.add("disabled");
            unitConvContainer.classList.remove("active");
            currConvContainer.classList.add("disabled");
            currConvContainer.classList.remove("active");

            heading.textContent = "Universal Calc";

            wrapper.style.height = "70vh";
            wrapper.style.width = "auto";

            body.style.backgroundImage = "linear-gradient(#DFEBED, #7D8CD5)";

            [topLeftSign, topRightSign, bottomLeftSign, bottomRightSign].forEach(el => el.style.display = "inline");
            bottomLeftSign.src = './img/minus.png';
            topRightSign.src = './img/multiple.png';
            topLeftSign.src = './img/plus.png';
            bottomRightSign.src = './img/dividing.png';

            switchCalcBtn.classList.add("active");
            switchUnitConvBtn.classList.remove("active");
            switchCurrConvBtn.classList.remove("active");
            
            startFlip();
        } else if (state === "measurement") {
            unitConvContainer.classList.add("active");
            unitConvContainer.classList.remove("disabled");
            mainCalcContainer.classList.add("disabled");
            mainCalcContainer.classList.remove("active");
            currConvContainer.classList.add("disabled");
            currConvContainer.classList.remove("active");

            heading.textContent = "Measurement converter";
            heading.style.marginTop = "5%";
            heading.style.marginBottom = "2%";

            wrapper.style.height = "auto";
            wrapper.style.width = "auto";

            body.style.backgroundImage = "linear-gradient(#DBFBFF, #BEE1EA, #3EA2BE)";

            [bottomLeftSign, topRightSign].forEach(el => el.style.display = "inline");
            [topLeftSign, bottomRightSign].forEach(el => el.style.display = "none");
            bottomLeftSign.src = './img/cm.png';
            topRightSign.src = './img/celcium.png';

            switchCalcBtn.classList.remove("active");
            switchUnitConvBtn.classList.add("active");
            switchCurrConvBtn.classList.remove("active");

            startFlip();
        } else if (state === "currency") {
            currConvContainer.classList.add("active");
            currConvContainer.classList.remove("disabled");
            unitConvContainer.classList.add("disabled");
            unitConvContainer.classList.remove("active");
            mainCalcContainer.classList.add("disabled");
            mainCalcContainer.classList.remove("active");

            heading.textContent = "Currency converter";

            wrapper.style.height = "40vh";
            wrapper.style.width = "auto";

            body.style.backgroundImage = "linear-gradient(#BFD9D0, #98A77D)";

            [topLeftSign, bottomRightSign].forEach(el => el.style.display = "inline");
            [bottomLeftSign, topRightSign].forEach(el => el.style.display = "none");
            topLeftSign.src = './img/usd.png';
            bottomRightSign.src = './img/eur.png';

            switchCalcBtn.classList.remove("active");
            switchUnitConvBtn.classList.remove("active");
            switchCurrConvBtn.classList.add("active");

            startFlip();
        }
    }

    switchCalcBtn.classList.add("active");

    if (calcMoreBtn) {
        calcMoreBtn.addEventListener("click", function () {
            moreOperations.classList.toggle("more__operations--visible");

            calcMoreBtn.classList.toggle("active", moreOperations.classList.contains("more__operations--visible"))
        });
    }

    startFlip();

    mainCalcContainer.classList.add("active");
    mainCalcContainer.classList.remove("disabled");
    unitConvContainer.classList.add("disabled");
    unitConvContainer.classList.remove("active");
    currConvContainer.classList.add("disabled");
    currConvContainer.classList.remove("active");

    calcSwitch.addEventListener("click", () => updateAppState("calc"));
    unitConvSwitch.addEventListener("click", () => updateAppState("measurement"));
    currConvSwitch.addEventListener("click", () => updateAppState("currency"));

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