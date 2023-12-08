const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => b === 0 ? "Error: Division by zero" : a / b,
    '%': (a, b) => a % b,
};

function operate(operator, a, b) {
    if (!operations[operator]) {
        return "Error: Invalid operator";
    }
    return operations[operator](a, b);
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

let displayValue = "";
let operator = "";
let powerOn = true;

function updateDisplay(value) {
    display.textContent = value;
}

// Calculator ON/OFF Button Functionality
function setCalculatorState(enabled) {
    let color = enabled ? "#CF6B79" : "#8de98c";
    let powerText = enabled ? "Off" : "On";
    let displayText = enabled ? "0" : "";

    buttons.forEach(button => button.disabled = !enabled);
    [clear, equals, decimal, backspace, ...operators].forEach(button => button.disabled = !enabled);

    power.style.backgroundColor = color;
    power.textContent = powerText;
    updateDisplay(displayText);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        displayValue += button.textContent;
        updateDisplay(displayValue);
    });
});

power.addEventListener("click", () => {
    powerOn = !powerOn;
    greeting();
    setTimeout(() => {
        setCalculatorState(powerOn);
    }, 2000);
});
    

function clearCalculator() {
    displayValue = "";
    firstValue = "";
    secondValue = "";
    result = null;
    operator = "";
    awaitingSecondValue = false;
    decimal.disabled = false;
}

//Event listeners for clear button
clear.addEventListener("click", () => {
    clearCalculator();
    updateDisplay("0");
});

//Event listeners for backspace button
backspace.addEventListener("click", () => {
    displayValue = displayValue.slice(0, -1);
    updateDisplay(displayValue);
});

//Event listeners for decimal button
decimal.addEventListener("click", () => {
    let currentNumber = awaitingSecondValue ? displayValue.slice(firstValue.length + operator.length) : displayValue;
    if(!currentNumber.includes(".")){
        displayValue += ".";
        updateDisplay(displayValue);
    }
});

/* Variables to hold the first and second values of the operation, the result,
   and a flag to indicate if we're awaiting a second value */
   let firstValue = "";
   let secondValue = "";
   let result = null;
   let awaitingSecondValue = false;
   
   function performOperation() {
       secondValue = displayValue.slice(firstValue.length + operator.length);
       result = operate(operator, parseFloat(firstValue), parseFloat(secondValue)).toString();
       firstValue = result;
       displayValue = firstValue + operator;
   }
   
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
               updateDisplay(displayValue);
               decimal.disabled = false;
               awaitingSecondValue = true;
           } 
           // If we're awaiting a second value, calculate the result of the operation and update the display
           else {
               decimal.disabled = false;
               performOperation();
               operator = operatorButton.textContent;
               updateDisplay(displayValue);
           }
       });
   });

//Event listener for equals button
equals.addEventListener("click", () => {
    // If we're awaiting a second value, calculate the result of the operation and update the display
    if (awaitingSecondValue) {
        secondValue = displayValue.slice(firstValue.length + operator.length);
        result = operate(operator, parseFloat(firstValue), parseFloat(secondValue)).toString();
        updateDisplay(result);
        displayValue = result;
        operator = "";
        decimal.disabled = false;
        awaitingSecondValue = false;
    }
});

// Function to handle keyboard input
function keyboardInput(e){
    e.preventDefault();
    let key = e.key;

    switch (key) {
        case 'Enter':
            key = '=';
            break;
        // Add cases for other special keys if needed
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
    let message = powerOn ? "Hello" : "Goodbye";
    let animationClass = powerOn ? 'fadeIn' : 'fadeOut';

    updateDisplay(message);
    display.classList.add(animationClass);

    // Remove the class after the animation completes to be ready for the next one
    setTimeout(function() {
        display.classList.remove('fadeIn');
        display.classList.remove('fadeOut');
    }, 2000); // same duration as your animation
}