let firstNum
let op
let secondNum
let displayValue=0

const display = document.querySelector(".display")
display.textContent=displayValue

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.textContent==="C"){
            displayValue=0
        }
        else{
            displayValue = button.textContent;
        }
        display.textContent = displayValue;
    });
});


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

console.log(operate(2,"+",4))
console.log(operate(2,"*",4))