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

function modulo(a, b){
    return a % b;
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
        case "%":
            return modulo(a, b);
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
let power = document.querySelector("#power");
let operators = document.querySelectorAll(".operator");

//Variables to hold the current display value
let displayValue = "";
let operator = "";
let powerOn = true;

//Event listeners for number buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        displayValue += button.textContent;
        display.textContent = displayValue;
    });
});

//Event listener for power button
power.addEventListener("click", () => {
    if(powerOn){
        powerOn = false;
        greeting();
        setTimeout(() => {
            displayValue = "";
            firstValue = "";
            secondValue = "";
            result = null;
            operator = "";
            awaitingSecondValue = false;
            display.textContent = "";
            decimal.disabled = false;
            power.textContent = "On";
            buttons.forEach((button) => {
                button.disabled = true;
            });
            clear.disabled = true;
            equals.disabled = true;
            decimal.disabled = true;
            backspace.disabled = true;
            operator.disabled = true;
            power.style.backgroundColor = "#8de98c";
        }, 2000); 
    }
    else{
        powerOn = true;
    greeting();
    setTimeout(() => {
        power.textContent = "Off";
        display.textContent = "0";
        buttons.forEach((button) => {
            button.disabled = false;
        });
        clear.disabled = false;
        equals.disabled = false;
        decimal.disabled = false;
        backspace.disabled = false;
        operator.disabled = false;
        power.style.backgroundColor = "#CF6B79";
    }, 2000); 
    }
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
    e.preventDefault();
    if(key == "Enter"){
        key = "=";
    }
    let button = document.querySelector(`button[data-key="${key}"]`);

    // If a corresponding button was found, simulate a click on it
    if (button) {
        button.click();
    }  
}

// Event listener for keyboard input
window.addEventListener("keydown", keyboardInput);

function greeting(){
    if(powerOn){
        display.textContent = "Hello";
        display.classList.add('fadeIn');
    } else{
        display.textContent = "Goodbye";
        display.classList.add('fadeOut');
    }

    // Remove the class after the animation completes to be ready for the next one
    setTimeout(function() {
        display.classList.remove('fadeIn');
        display.classList.remove('fadeOut');
    }, 2000); // same duration as your animation
}