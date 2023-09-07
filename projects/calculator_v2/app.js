// Selectors
const upperTextbox = document.getElementById("box-one");
const downTextBox = document.getElementById("box-two");
const numberButton = document.querySelector(".number-btn");
const operationButton = document.querySelector(".operation-btn");
const buttons = document.querySelector(".button");
var operationArray = [];
var numArray = [];
var result = 0;
var isNegative;

// Functions
function addChar(e) {
    const character = e.target;
    switch (character.id) {
        case "clear":
            upperTextbox.innerHTML = "";
            downTextBox.innerHTML = "=";
            operationArray = [];
            break;
        case "one":
            upperTextbox.innerHTML += "1";
            break;
        case "two":
            upperTextbox.innerHTML += "2";
            break;
        case "three":
            upperTextbox.innerHTML += "3";
            break;
        case "four":
            upperTextbox.innerHTML += "4";
            break;
        case "five":
            upperTextbox.innerHTML += "5";
            break;
        case "six":
            upperTextbox.innerHTML += "6";
            break;
        case "seven":
            upperTextbox.innerHTML += "7";
            break;
        case "eight":
            upperTextbox.innerHTML += "8";
            break;
        case "nine":
            upperTextbox.innerHTML += "9";
            break;
        case "zero":
            upperTextbox.innerHTML += "0";
            break;
        case "zero-zero":
            upperTextbox.innerHTML += "00";
            break;
        case "dot":
            addDot();
            break;
        case "delete":
            var tempArray = upperTextbox.innerHTML.split("");
            tempArray.pop();
            upperTextbox.innerHTML = tempArray.join("");
            break;
        case "add":
            addOperation("+");
            break;
        case "subtract":
            addOperation("-");
            break;
        case "divide":
            addOperation("÷");
            break;
        case "multiply":
            addOperation("×");
            break;
    }
}

function addOperation(e) {
    var upperLength = upperTextbox.innerHTML.length;
    var tempArray = upperTextbox.innerHTML.split("");
    if (upperLength > 0) {
        switch (upperTextbox.innerHTML[upperLength - 1]) {
            case "+":
                tempArray.pop();
                tempArray.push(e);
                upperTextbox.innerHTML = tempArray.join("");
                break;
            case "-":
                tempArray.pop();
                tempArray.push(e);
                upperTextbox.innerHTML = tempArray.join("");
                break;
            case "÷":
                tempArray.pop();
                tempArray.push(e);
                upperTextbox.innerHTML = tempArray.join("");
                break;
            case "×":
                tempArray.pop();
                tempArray.push(e);
                upperTextbox.innerHTML = tempArray.join("");
                break;
            default:
                upperTextbox.innerHTML += e;
                break;
        }
    }
}

function arrayMaker() {
    numArray = upperTextbox.innerHTML.split(/÷|\+|-|\×/g);
    
    if (numArray[numArray.length - 1] !== "" && numArray.length >= 2) {
        for (var i = 0; i < upperTextbox.innerHTML.length; i++) {
            switch (upperTextbox.innerHTML[i]) {
                case "+":
                    operationArray.push("+");
                    break;
                case "-":
                    operationArray.push("-");
                    break;
                case "÷":
                    operationArray.push("÷");
                    break;
                case "×":
                    operationArray.push("×");
                    break;
            }
            while (numArray.length <= operationArray.length) {
                operationArray.shift();
            }
            calculate();
        }
    }
}

function addDot() {
    var tempString = upperTextbox.innerHTML.indexOf(".");
    if (tempString < 0) {
        upperTextbox.innerHTML += ".";
    }
}

function calculate() {
    console.clear();
    var tempOperationArray = [];
    var tempNumArray = [];
    var importantOperation = [];
    var normalOperation = [];
    var tempResult = 0;
    for (var i = 0; i < operationArray.length; i++) {
        tempOperationArray.push(operationArray[i]);
    }
    for (var i = 0; i < numArray.length; i++) {
        tempNumArray.push(numArray[i]);
    }
    
    for (var i = 0; i < tempOperationArray.length; i++) {
        if (tempOperationArray[i] === "÷" || tempOperationArray[i] === "×") {
            importantOperation++;
        }
    }
    for (var i = 0; i < tempOperationArray.length; i++) {
        if (tempOperationArray[i] === "+" || tempOperationArray[i] === "-") {
            normalOperation++;
        }
    }
    while (tempOperationArray.length !== 0) {
        for (var i = 0; i < tempOperationArray.length; i++) {
            if (tempOperationArray[i] === "÷" || tempOperationArray[i] === "×") {
                if (importantOperation > 0) {
                    if (tempOperationArray[i] === "÷") {
                        var tempResult = Number(tempNumArray[i]) / Number(tempNumArray[i + 1]);
                        tempNumArray.splice(i, 2, String(tempResult));
                        tempOperationArray.splice(i, 1);
                        i--;
                    } else {
                        var tempResult = Number(tempNumArray[i]) * Number(tempNumArray[i + 1]);
                        tempNumArray.splice(i, 2, String(tempResult));
                        tempOperationArray.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        for (var i = 0; i < tempOperationArray.length; i++) {
            if (tempOperationArray[i] === "+" || tempOperationArray[i] === "-") {
                if (normalOperation > 0) {
                    if (tempOperationArray[i] === "+") {
                        if (downTextBox.innerHTML[2] === "-") {
                            var tempResult = Number(tempNumArray[i]) - Number(tempNumArray[i + 1]);
                        } else {
                            var tempResult = Number(tempNumArray[i]) + Number(tempNumArray[i + 1]);
                        }
                        tempNumArray.splice(i, 2, String(tempResult));
                        tempOperationArray.splice(i, 1);
                        i--;
                    } else {
                        var tempResult = Number(tempNumArray[i]) - Number(tempNumArray[i + 1]);
                        tempNumArray.splice(i, 2, String(tempResult));
                        tempOperationArray.splice(i, 1);
                        i--;
                        
                    }
                }
            }
        }
    }
    result = tempNumArray[0];
}

function resultShower() {
    downTextBox.innerHTML = "= " + result;
}

function divisionAndMultiplication(e) {

}

// Events
buttons.addEventListener("click", addChar);
buttons.addEventListener("click", arrayMaker);
buttons.addEventListener("click", resultShower);
