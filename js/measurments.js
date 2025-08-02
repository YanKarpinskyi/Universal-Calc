document.addEventListener("DOMContentLoaded", function () {
    const firstUnitInput = document.getElementById("first__unit");
    const secondUnitInput = document.getElementById("second__unit");
    const firstInputLbl = document.getElementById("first__unit__lbl");
    const secondInputLbl = document.getElementById("second__unit__lbl");

    const [main_calc__container, unit_calc__container, curr_calc__container] = [
        document.querySelector(".main_calc__container"),
        document.querySelector(".unit_calc__container"),
        document.querySelector(".curr_calc__container")
    ];

    const [calc__switch, unit_conv__switch, curr_conv__switch] = [
        document.getElementById("calc__switch"),
        document.getElementById("unit_conv__switch"),
        document.getElementById("curr_conv__switch")
    ];

    const convBtn = document.querySelectorAll(".conv__btn");

    let activeInput = null;

    main_calc__container.classList.add("active");
    main_calc__container.classList.remove("disabled");
    unit_calc__container.classList.add("disabled");
    unit_calc__container.classList.remove("active");
    curr_calc__container.classList.add("disabled");
    curr_calc__container.classList.remove("active");

    calc__switch.addEventListener("click", () => {
        main_calc__container.classList.add("active");
        main_calc__container.classList.remove("disabled");
        unit_calc__container.classList.add("disabled");
        unit_calc__container.classList.remove("active");
        curr_calc__container.classList.add("disabled");
        curr_calc__container.classList.remove("active");
    })

    unit_conv__switch.addEventListener("click", () => {
        unit_calc__container.classList.add("active");
        unit_calc__container.classList.remove("disabled");
        main_calc__container.classList.add("disabled");
        main_calc__container.classList.remove("active");
        curr_calc__container.classList.add("disabled");
        curr_calc__container.classList.remove("active");
    })

    curr_conv__switch.addEventListener("click", () => {
        curr_calc__container.classList.add("active");
        curr_calc__container.classList.remove("disabled");
        unit_calc__container.classList.add("disabled");
        unit_calc__container.classList.remove("active");
        main_calc__container.classList.add("disabled");
        main_calc__container.classList.remove("active");
    })

    const converterMoreBtn = document.querySelector(".unit_calc__values .btn__more");
    if (converterMoreBtn) {
        converterMoreBtn.addEventListener("click", function () {
            more__measurments.classList.toggle("more__measurments--visible");
        });
    }

    const calcMoreBtn = document.querySelector(".more__container .btn__more");
    if (calcMoreBtn) {
        calcMoreBtn.addEventListener("click", function () {
            more__operations.classList.toggle("more__operations--visible");
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

    convBtn.forEach(button => {
        button.addEventListener("click", () => {
            if (!activeInput) return;

            if (activeInput === firstUnitInput) {
                firstInputLbl.innerHTML = button.innerHTML;
            } else if (activeInput === secondUnitInput) {
                secondInputLbl.innerHTML = button.innerHTML;
            }
        });
    });
});