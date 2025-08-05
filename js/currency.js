async function fetchExchangeRate(from, to) {
    const url = `https://v6.exchangerate-api.com/v6/68a0330a5fd59241f60d3d6b/pair/${from}/${to}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch exchange rate");
    }

    const data = await response.json();
    return data.conversion_rate;
}

document.addEventListener("DOMContentLoaded", function () {
    const firstUnitInput = document.getElementById("first__curr");
    const secondUnitInput = document.getElementById("second__curr");
    const firstInputLbl = document.getElementById("first__curr__lbl");
    const secondInputLbl = document.getElementById("second__curr__lbl");
    const convertBtn = document.getElementById("curr_conv__convert");
    const currencyButtons = document.querySelectorAll(".curr_calc__container .conv__btn");
    const reverseBtn = document.getElementById("curr_conv__reverse");
    const cancelBtn = document.getElementById("curr_conv__cancel");

    let activeInput = null;
    let fromCurrency = "";
    let toCurrency = "";

    [firstUnitInput, secondUnitInput].forEach(input => {
        input.addEventListener("focus", () => {
            activeInput = input;
        });
    });

    [firstUnitInput, secondUnitInput].forEach(input => {
        input.addEventListener("input", () => {
            let inputValue = input.value.trim();
            if (inputValue === "" || isNaN(Number(inputValue))) {
                input.value = "";
                input.placeholder = "Enter only numbers please!";
                input.style.border = "1px solid red";
            } else {
                input.placeholder = "";
                input.style.border = "";
            }
        });
    });

    currencyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedCurr = button.dataset.curr;
            if (!selectedCurr) return;

            if (activeInput === firstUnitInput) {
                fromCurrency = selectedCurr;
                firstInputLbl.textContent = fromCurrency;
            } else if (activeInput === secondUnitInput) {
                toCurrency = selectedCurr;
                secondInputLbl.textContent = toCurrency;
            }
        });
    });

    convertBtn.addEventListener("click", async () => {
        const inputValue = parseFloat(firstUnitInput.value);

        if (isNaN(inputValue) || !fromCurrency || !toCurrency) return;

        try {
            const rate = await fetchExchangeRate(fromCurrency.toUpperCase(), toCurrency.toUpperCase());
            const convertedValue = (inputValue * rate).toFixed(2);
            secondUnitInput.value = convertedValue;
        } catch (error) {
            console.error("Conversion error:", error);
            secondUnitInput.value = "Error";
        }
    });

    reverseBtn.addEventListener("click", () => {
        let temp = fromCurrency;
        fromCurrency = toCurrency;
        toCurrency = temp;

        const tempText = firstInputLbl.textContent;
        firstInputLbl.textContent = secondInputLbl.textContent;
        secondInputLbl.textContent = tempText;

        let tempValue = firstUnitInput.value;
        firstUnitInput.value = secondUnitInput.value;
        secondUnitInput.value = tempValue;
    });

    cancelBtn.addEventListener("click", () => {
        firstInputLbl.textContent = "";
        secondInputLbl.textContent = "";

        firstUnitInput.value = "";
        secondUnitInput.value = "";

        fromCurrency = "";
        toCurrency = "";
    });
});