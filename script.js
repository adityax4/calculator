let firstNum=''
let op=null
let secondNum=''
let displayValue='0'

const display = document.querySelector(".display")
display.textContent=displayValue

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