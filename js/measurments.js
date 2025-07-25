const [firstUnitInput, secondUnitInput] = [
    document.getElementById("first__unit"),
    document.getElementById("second__unit")
];

const [firstInputLbl, secondInputLbl] = [
    document.getElementById("first__unit__lbl"),
    document.getElementById("second__unit__lbl")
];

const convBtn = document.querySelectorAll(".conv__btn");

let lastClickedBtn = null;
let activeInput = null;

[firstUnitInput, secondUnitInput].forEach(input => {
  input.addEventListener("focus", () => {
    activeInput = input;
  });
});

convBtn.forEach(button => {
  button.addEventListener("click", () => {
    lastClickedBtn = button;
    if (!activeInput) return;  
    
    if (activeInput === firstUnitInput) {
      firstInputLbl.textContent = button.innerText;
    } else if (activeInput === secondUnitInput) {
      secondInputLbl.textContent = button.innerText;
    }
  });
});
