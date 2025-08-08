document.addEventListener("DOMContentLoaded", function () {
    const firstUnitInput = document.getElementById("first__unit");
    const secondUnitInput = document.getElementById("second__unit");
    const firstInputLbl = document.getElementById("first__unit__lbl");
    const secondInputLbl = document.getElementById("second__unit__lbl");

    const convBtn = document.querySelectorAll(".conv__btn");
    const convertBtn = document.querySelector(".btn__convert");
   
    const converterMoreBtn = document.querySelector(".unit_conv__values .btn__more");
    const moreMeasurements = document.getElementById("more__measurements");

    let activeInput = null;

    let fromUnit = "";
    let toUnit = "";

    if (converterMoreBtn) {
        converterMoreBtn.addEventListener("click", function () {
            moreMeasurements.classList.toggle("more__measurements--visible");

            converterMoreBtn.classList.toggle("active", moreMeasurements.classList.contains("more__measurements--visible"))
        });
    }

    [firstUnitInput, secondUnitInput].forEach(input => {
        input.addEventListener("focus", () => {
            activeInput = input;
        });

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

    convertBtn.addEventListener("click", () => {
        const inputValue = parseFloat(firstUnitInput.value);

        if (isNaN(inputValue) || !fromUnit || !toUnit) return;

        let convertedValue;

        const temperatureUnits = ["°C", "°F", "K"];
        if (temperatureUnits.includes(fromUnit) && temperatureUnits.includes(toUnit)) {
            convertedValue = convertTemperature(inputValue, fromUnit, toUnit);
        } else {
            convertedValue = convert(inputValue, fromUnit, toUnit);
        }

        secondUnitInput.value = convertedValue;
    });

    function convertTemperature(value, from, to) {
        if (from === to) return value;

        let tempInC;

        if (from === "°C") tempInC = value;
        // Фаренгейт → Цельсій
        else if (from === "°F") tempInC = (value - 32) * 5 / 9;
        // Кельвін → Цельсій
        else if (from === "K") tempInC = value - 273.15;

        if (to === "°C") return tempInC;
        // Цельсій → Фаренгейт
        if (to === "°F") return tempInC * 9 / 5 + 32;
        // Цельсій → Кельвін
        if (to === "K") return tempInC + 273.15;
    }

    const lengthFactors = {
        mm: 0.1,       
        cm: 1,         
        m: 100,        
        km: 100000,    
        in: 2.54,      
        ft: 30.48,     
        yd: 91.44,     
        mi: 160934.4   
    };

    const volumeFactors = {
        ml: 1,           
        cl: 10,          
        l: 1000,         
        "cm³": 1,        
        "m³": 1e6,       
        tsp: 4.929,      
        tbsp: 14.787,    
        cup: 240,        
        pt: 473.176,     
        "fl-oz": 29.5735,
        qt: 946.353,     
        gal: 3785.41     
    };

    const weightFactors = {
        mg: 0.001,   
        g: 1,
        kg: 1000,
        t: 1e6,    
        oz: 28.3495,
        lb: 453.592
    };

    const areaFactors = {
        mm2: 0.01,        
        cm2: 1,
        m2: 10000,
        km2: 1e10,
        a: 1e6,           
        ha: 1e8,          
        in2: 6.4516,      
        ft2: 929.0304,    
        yd2: 8361.27,     
        Acre: 40468564.224 
    };

    function convert(value, from, to) {
        const allFactors = {
            ...lengthFactors,
            ...volumeFactors,
            ...weightFactors,
            ...areaFactors
        }
        
        const baseValue = value * allFactors[from];
        return baseValue / allFactors[to]
    }
    
    convBtn.forEach(button => {
        button.addEventListener("click", () => {
            if (!activeInput) return;

            if (activeInput === firstUnitInput) {
                fromUnit = button.dataset.unit;
                firstInputLbl.textContent = fromUnit;
            } else {
                toUnit = button.dataset.unit;
                secondInputLbl.textContent = toUnit;
            }
        });
    });

    document.querySelector(".unit__section > .btn__cancel").addEventListener("click", function() {
        firstUnitInput.value = "";
        secondUnitInput.value = "";
        firstInputLbl.innerText = "";
        secondInputLbl.innerText = "";

        fromUnit = "";
        toUnit = "";
    });

    document.querySelector(".unit__section > .btn__reverse").addEventListener("click", function() {
        let tempLbl = firstInputLbl.innerText;

        firstInputLbl.innerText = secondInputLbl.innerText;
        secondInputLbl.innerText = tempLbl;

        let tempUnit = fromUnit;
        fromUnit = toUnit;
        toUnit = tempUnit;
    });
});