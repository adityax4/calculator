let input = null
let operator = null
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
    removeZeroDisplay();

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

function removeZeroDisplay(){
    if(zeroDisplay.innerText.length!=0){
        zeroDisplay.innerText='';
    }
}

opButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        applyOp(button.innerText);
    })
})

function applyOp(op){
    removeZeroDisplay();
    if(input===null && result!=null){
        operator = op;
        displayHistory.innerText=result+" "+operator;
    }
    else if(input!=null && (displayHistory.innerText.includes('+')==true || displayHistory.innerText.includes('-')==true || displayHistory.innerText.includes('/')==true || displayHistory.innerText.includes('*')==true)){
        if(result===null){
            operator=op;
            result=input;
            input=null;
            displayHistory.innerText=result+" "+operator;
        }
        else{
            displayHistory.innerText=result+" "+operator+" "+input;
            result= (operate(parseFloat(result), operator, parseFloat(input))).toString();
            if(result==="IMPOSSIBLE") displayZeroError();
            displayResult.innerText=result;
            input=null;
            operator=op; 
        }
    }
    else if(input!=null){
        operator=op;
        result=input;
        input=null;
        displayHistory.innerText = result+" "+operator;
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
    else if(op=="x"){
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
    removeZeroDisplay();
    if(input!=null && result!=null){
        displayHistory.innerText=result+" "+operator+" "+input;
        result = (operate(parseFloat(result), operator, parseFloat(input))).toString();
        if(result==="IMPOSSIBLE") displayZeroError();
        input=null;
        displayResult.innerText=result;
    }
}

clrButton.addEventListener('click', ()=>{
    applyClear();
})

function applyClear(){
    input=null
    result=null
    displayHistory.innerText="";
    displayResult.innerText="";
    zeroDisplay.innerText="";
}

delButton.addEventListener('click', ()=>{
    applyDelete();
})

function applyDelete(){
    if(result!=null && input === null){
        result=parseFloat(result.toString().slice(0,-1));
        if(isNaN(result)) result=0;
        displayResult.innerText=result;
        input=result;
        historyDisplayFix();
    }
    else if(input){
        input=input.toString().slice(0,-1);
        displayResult.innerText=input;
        if(input.length===0) input=null;
        historyDisplayFix();
    }
}

const display = document.querySelector(".display");

function historyDisplayFix(){
    if(displayResult.innerText.length==0 && displayHistory.innerText.length!=0){
        display.classList.remove('column');
    }
    else display.classList.add('column')
}

decimalButton.addEventListener('click', ()=>{
    applyDecimal();
})

function applyDecimal(){
    removeZeroDisplay();
    if(enter==true){
        input="0.";
        result=null;
        displayHistory.innerText="";
        displayResult.innerText=input;
        enter=false;
    }
    else if(input===null){
        input="0.";
        displayResult.innerText=input;
        enter=false;
    }
    else if(input.indexOf('.')==-1){
        input+='.';
        displayResult.innerText=input;
    }
}

// Keyboard functionality

document.body.addEventListener('keydown', (e)=>{
    const key=e.key;
    if(key>=0 && key<=9){
        displayNum(key)
    }
    else if(key==="/" || key==="*" || key==="-" || key==="+"){
        if(key==="*") applyOp("x");
        else applyOp(key);
    }
    else if(key==="."){
        applyDecimal();
    }
    else if(key==="Enter"){
        e.preventDefault();
        applyEqual();
        enter=true;
    }
    else if(key==="Delete" || key ==="Backspace"){
        applyDelete();
    }
    else if(key==="Escape"){
        applyClear();
    }
})