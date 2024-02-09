let input = null
let op = null
let result = null
let enter = false

const displayResult = document.querySelector(".display-result")
const displayHistory = document.querySelector(".display-history")
const zeroDisplay = document.querySelector(".zero-division-message")
const numButtons = document.querySelectorAll(".number")
const opButtons = document.querySelectorAll(".operator")
const eqButton = document.querySelector(".equals")
const clrButton = document.querySelector(".clear")
const delButton = document.querySelector(".delete")
const decimalButton = document.querySelector(".decimal")




const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    changeDisplay(button)
});

function changeDisplay(button){
    button.addEventListener('click', () => {
        if(button.textContent==="C"){
            displayValue='0'
        }
        else if(button.textContent==="Del"){
            displayValue = displayValue.slice(0, -1);
            if (displayValue === '') {
                displayValue = '0';
            }
        }
        else if (button.textContent === "+" || button.textContent === "-" || button.textContent === "*" || button.textContent === "/") {
            if (firstNum !== '' && op !== null && secondNum === '') {
                op = button.textContent;
                displayValue = op;
            } else if (firstNum === '') {
                firstNum = parseFloat(displayValue);
                op = button.textContent;
                displayValue = op;
            }
        } 
        else if (button.textContent === "=") {
            if (firstNum !== '' && op !== null && secondNum === '') {
                secondNum = parseFloat(displayValue);
                let result = operate(firstNum, op, secondNum);
                if (isNaN(result) || !isFinite(result)) {
                    displayValue = 'Error';
                } else {
                    displayValue = result;
                }
                firstNum = '';
                op = null;
                secondNum = '';
            }
        }
        else{
            if(displayValue=='0'){
                displayValue=button.textContent;
            }
            else{
                displayValue += button.textContent;
            }
        }
        display.textContent = displayValue;
    });
}


function operate(firstNum, op, secondNum){
    if(op=="+"){
        return firstNum+secondNum;
    }
    else if(op=="-"){
        return firstNum-secondNum;
    }
    else if(op=="*"){
        return firstNum*secondNum;
    }
    else if(op=="/"){
        return firstNum/secondNum;
    }
}
























