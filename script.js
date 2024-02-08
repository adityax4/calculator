let firstNum
let op
let secondNum

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