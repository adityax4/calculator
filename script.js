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
        displayNum(button.textContent);
    })
});

// display numbers on screen
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
    displayResult.textContent=input;
}

function addColumn(){
    display.classList.add('column');
}

// clear divide zero message
function removeZeroDisplay(){
    if(zeroDisplay.textContent.length!=0){
        zeroDisplay.textContent='';
    }
}

opButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        applyOp(button.textContent);
    })
})


function applyOp(op){
    removeZeroDisplay();
    if(input===null && result!=null){
        operator = op;
        displayHistory.textContent=result+" "+operator;
    }
    else if(input!=null && (displayHistory.textContent.includes('+')==true || displayHistory.textContent.includes('-')==true || displayHistory.textContent.includes('/')==true || displayHistory.textContent.includes('*')==true)){
        if(result===null){
            operator=op;
            result=input;
            input=null;
            displayHistory.textContent=result+" "+operator;
        }
        else{
            displayHistory.textContent=result+" "+operator+" "+input;
            result= (operate(parseFloat(result), operator, parseFloat(input))).toString();
            if(result==="IMPOSSIBLE") displayZeroError();
            displayResult.textContent=result;
            input=null;
            operator=op; 
        }
    }
    else if(input!=null){
        operator=op;
        result=input;
        input=null;
        displayHistory.textContent = result+" "+operator;
    }
}

function displayZeroError(){
    input=null;
    result=null;
    displayHistory.textContent="";
    displayResult.textContent="";
    zeroDisplay.textContent = "can't divide by 0";
}


function operate(firstNum, op, secondNum){
    if(op=="+"){
        return firstNum+secondNum;
    }
    else if(op=="-"){
        return firstNum-secondNum;
    }
    else if(op=="×"){
        return firstNum*secondNum;
    }
    else if(op=="÷"){
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
        displayHistory.textContent=result+" "+operator+" "+input;
        result = (operate(parseFloat(result), operator, parseFloat(input))).toString();
        if(result==="IMPOSSIBLE") displayZeroError();
        input=null;
        displayResult.textContent=result;
    }
}

clrButton.addEventListener('click', ()=>{
    applyClear();
})

function applyClear(){
    input=null
    result=null
    displayHistory.textContent="";
    displayResult.textContent="";
    zeroDisplay.textContent="";
}

delButton.addEventListener('click', ()=>{
    applyDelete();
})

function applyDelete(){
    if(result!=null && input === null){
        result=parseFloat(result.toString().slice(0,-1));
        if(isNaN(result)) result=0;
        displayResult.textContent=result;
        input=result;
        historyDisplayFix();
    }
    else if(input){
        input=input.toString().slice(0,-1);
        displayResult.textContent=input;
        if(input.length===0) input=null;
        historyDisplayFix();
    }
}

const display = document.querySelector(".display");

function historyDisplayFix(){
    if(displayResult.textContent.length==0 && displayHistory.textContent.length!=0){
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
        displayHistory.textContent="";
        displayResult.textContent=input;
        enter=false;
    }
    else if(input===null){
        input="0.";
        displayResult.textContent=input;
        enter=false;
    }
    else if(input.indexOf('.')==-1){
        input+='.';
        displayResult.textContent=input;
    }
}

// Keyboard functionality

document.body.addEventListener('keydown', (e)=>{
    const key=e.key;
    if(key>=0 && key<=9){
        displayNum(key);
    }
    else if(key==="/" || key==="*" || key==="-" || key==="+"){
        if(key==="*") applyOp("×");
        if(key==="/") applyOp("÷")
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
