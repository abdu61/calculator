function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b == 0){
        return "Error: Division by zero";
    }
    return a / b;
}

function operate(operator, a, b){
    switch(operator){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let display = document.querySelector("#show");
let buttons = document.querySelectorAll(".buttonNo");
let clear = document.querySelector("#clear");
let equals = document.querySelector("#equals");
let decimal = document.querySelector("#decimal");
let backspace = document.querySelector("#backspace");
let operators = document.querySelectorAll(".operator");
let displayValue = "";
let operator = "";

buttons.forEach((button => {
    button.addEventListener("click", () => {
        displayValue += button.textContent;
        display.textContent = displayValue;
    })
}
))

clear.addEventListener("click", () => {
    displayValue = "";
    display.textContent = displayValue;
})

backspace.addEventListener("click", () => {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
})

decimal.addEventListener("click", () => {
    if(!displayValue.includes(".")){
        displayValue += ".";
        display.textContent = displayValue;
    }
})

operators.forEach((operatorButton => {
    operatorButton.addEventListener("click", () => {
        operator = operatorButton.textContent;
        displayValue += operator;
        display.textContent = displayValue;
    })
}))

equals.addEventListener("click", () => {
    let values = displayValue.split(operator);
    let a = parseFloat(values[0]);
    let b = parseFloat(values[1]);
    displayValue = operate(operator, a, b);
    display.textContent = displayValue;
})




