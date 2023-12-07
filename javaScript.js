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
        default:
            return "Error: Invalid operator";
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

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        displayValue += button.textContent;
        display.textContent = displayValue;
    });
});

clear.addEventListener("click", () => {
    displayValue = "";
    firstValue = "";
    secondValue = "";
    result = null;
    operator = "";
    awaitingSecondValue = false;
    display.textContent = "0";
    decimal.disabled = false;
});

backspace.addEventListener("click", () => {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
});

decimal.addEventListener("click", () => {
    let currentNumber = awaitingSecondValue ? displayValue.slice(firstValue.length + operator.length) : displayValue;
    if(!currentNumber.includes(".")){
        displayValue += ".";
        display.textContent = displayValue;
    }
});

let firstValue = "";
let secondValue = "";
let result = null;
let awaitingSecondValue = false;

operators.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        if (!awaitingSecondValue) {
            operator = operatorButton.textContent;
            firstValue = displayValue;
            displayValue += operator;
            display.textContent = displayValue;
            decimal.disabled = false;
            awaitingSecondValue = true;
        } else {
            decimal.disabled = false;
            secondValue = displayValue.slice(firstValue.length + operator.length);
            result = operate(operator, parseFloat(firstValue), parseFloat(secondValue)).toString();
            firstValue = result;
            operator = operatorButton.textContent;
            displayValue = firstValue + operator;
            display.textContent = displayValue;
        }
    });
});

equals.addEventListener("click", () => {
    if (awaitingSecondValue) {
        secondValue = displayValue.slice(firstValue.length + operator.length);
        result = operate(operator, parseFloat(firstValue), parseFloat(secondValue)).toString();
        display.textContent = result;
        displayValue = result;
        operator = "";
        decimal.disabled = false;
        awaitingSecondValue = false;
    }
});