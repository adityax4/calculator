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



numButtons.forEach(button => {
    button.addEventListener('click', () => {
        displayNum(button.innerText);
    })
});

function displayNum(number){
    addColumn();
    if(zeroDisplay.innerText.length!=0) zeroDisplay.innerText='';

    if(enter===true){
        input=number;
        result=null;
        enter=false;
    }
    else if(input===null){
        input=number;
    }
    else input+=number;
    displayResult.innerText=input;
}

function addColumn(){
    display.classList.add('column');
}

opButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        applyOp(button.innerText);
    })
})

function applyOp(op){
    if(zeroDisplay.innerText.length!=0){
        zeroDisplay.innerText='';
    }
    if(input===null && result!=null){
        op = op;
        displayHistory.innerText=result+" "+op;
    }
    else if(input!=null && (displayHistory.innerText.includes('+')==true || displayHistory.innerText.includes('-')==true || displayHistory.innerText.includes('/')==true || displayHistory.innerText.includes('*')==true)){
        if(result===null){
            op=op;
            result=input;
            input=null;
            displayHistory.innerText=result+" "+op;
        }
        else{
            displayHistory.innerText=result+" "+op+" "+input;
            result= (operate(parseFloat(result), op, parseFloat(input))).toString();
            if(result==="IMPOSSIBLE") displayZeroError();
            displayResult.innerText=result;
            input=null;
            op=op; 
        }
    }
    else if(input!=null){
        op=op;
        result=input;
        input=null;
        displayHistory.innerText = result+" "+op;
    }
}

function displayZeroError(){
    input=null;
    result=null;
    displayHistory.innerText="";
    displayResult.innerText="";
    zeroDisplay.innerText = "can't divide by 0";
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
        if(secondNum===0) return "IMPOSSIBLE";
        return firstNum/secondNum;
    }
}

eqButton.addEventListener('click', ()=>{
    applyEqual();
})

function applyEqual(){
    if(zeroDisplay.innerText.length!=0){
        zeroDisplay.innerText="";
    }
    else if(input!=null && result!=null){
        displayHistory.innerText=result+" "+op+" "+input;
        result = (operate(parseFloat(result), op, parseFloat(input))).toString();
        if(result==="IMPOSSIBLE") displayZeroError();
        input=null;
        displayResult.innerText=result;
    }
}

