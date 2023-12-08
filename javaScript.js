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

//Select elements from the DOM
let display = document.querySelector("#show");
let buttons = document.querySelectorAll(".buttonNo");
let clear = document.querySelector("#clear");
let equals = document.querySelector("#equals");
let decimal = document.querySelector("#decimal");
let backspace = document.querySelector("#backspace");
let operators = document.querySelectorAll(".operator");

//Variables to hold the current display value
let displayValue = "";
let operator = "";

//Event listeners for number buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        displayValue += button.textContent;
        display.textContent = displayValue;
    });
});

//Event listeners for clear button
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

//Event listeners for backspace button
backspace.addEventListener("click", () => {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
});

//Event listeners for decimal button
decimal.addEventListener("click", () => {
    let currentNumber = awaitingSecondValue ? displayValue.slice(firstValue.length + operator.length) : displayValue;
    if(!currentNumber.includes(".")){
        displayValue += ".";
        display.textContent = displayValue;
    }
});

/* Variables to hold the first and second values of the operation, the result,
   and a flag to indicate if we're awaiting a second value */
let firstValue = "";
let secondValue = "";
let result = null;
let awaitingSecondValue = false;

//Event listeners for operator buttons
operators.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        // If the last character in displayValue is an operator, ignore this click
        if ('+-*/'.includes(displayValue.slice(-1))) {
            return;
        }
        
        // If we're not awaiting a second value, store the operator and first value, and update the display
        if (!awaitingSecondValue) {
            operator = operatorButton.textContent;
            firstValue = displayValue;
            displayValue += operator;
            display.textContent = displayValue;
            decimal.disabled = false;
            awaitingSecondValue = true;
        } 
        // If we're awaiting a second value, calculate the result of the operation and update the display
        else {
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

//Event listener for equals button
equals.addEventListener("click", () => {
    // If we're awaiting a second value, calculate the result of the operation and update the display
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

// Function to handle keyboard input
function keyboardInput(e){
    let key = e.key;
    if(key == "Enter"){
        key = "=";
    }
    e.preventDefault()
    let button = document.querySelector(`button[data-key="${key}"]`);

    // If a corresponding button was found, simulate a click on it
    if (button) {
        button.click();
    }  
}

// Event listener for keyboard input
window.addEventListener("keydown", keyboardInput);
