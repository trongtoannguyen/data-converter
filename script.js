document.addEventListener("DOMContentLoaded", function () {
    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});

// ========================CALCULATORS========================
// HEX TO DEC (6)
function HexToDec(hexadecimal) {
    const hexDigits = "0123456789ABCDEF";
    let base = 16;
    let decimal = 0;
    let hexValue = 0;
    for (const element of hexadecimal) {
        const hexDigit = element.toUpperCase();
        hexValue = hexDigits.indexOf(hexDigit);
        decimal = decimal * base + hexValue;
    }
    return decimal;
}

// DECIMAL TO BINARY
function DecToBin(decimal) {
    const myArray = [];
    let i = 0;
    while (decimal !== 0) {
        myArray[i] = decimal % 2;
        i++;
        decimal = Math.floor(decimal / 2);
    }
    myArray.reverse();
    //Reserve Array
    return myArray;
}


// RIGHT FLOW FUNCTIONS (bin-dec-hex)
// BINARY TO DECIMAL
function BinToDec(binary) {
    let decimal = 0, base = 0;
    while (binary !== 0) {
        let remainder = binary % 10;
        decimal += remainder * Math.pow(2, base);
        binary = Math.floor(binary / 10);
        base++;
    }
    return decimal;
}

// DECIMAL TO HEX (OK USING BUILD-IN METHOD)
function DecToHex(decimal) {
    const hexDigits = "0123456789ABCDEF";
    let hexString = '';
    while (decimal !== 0) {
        const remainder = decimal % 16;
        hexString = hexDigits[remainder] + hexString;
        decimal = Math.floor(decimal / 16);
    }
    return hexString;
}
// BIN TO HEX
function BinToHex(binary) {
    const hexString = DecToHex(BinToDec(binary));
    return hexString;
}

// ==============================================================

function processConvert() {

    let unit1Type = document.getElementById('unit1').value;
    let unit2Type = document.getElementById('unit2').value;
    let unitOpe = unit1Type - unit2Type;
    let inputValue = document.getElementById('unit1Value').value;
    let outputResult = document.getElementById('unit2Result');

    //String variable to print out array...
    let outputString = '';
    //String variable to print out value...
    let results = '';

    switch (unitOpe) {
        case 8: //DEC TO BIN
            results = DecToBin(inputValue);
            //print result into input (id : unit2Value) field.
            for (const element of results) {
                outputString += element + '';
            }
            outputResult.value = outputString;
            break;
        case (-8): //BIN TO DEC
            results = BinToDec(inputValue);
            outputResult.value = results;
            break;
        case (-6): //DEC TO HEX
            results = DecToHex(inputValue);
            outputResult.value = results;
            break;
        case (6): //HEX TO DEC
            results = HexToDec(inputValue);
            outputResult.value = results;
            break;
        case (-14): //BIN TO HEX
            results = BinToHex(inputValue);
            outputResult.value = results;
            break;

        default:
            alert("Data Error!");
            break;
    }
}

let inputField = document.getElementById("unit1Value");
inputField.addEventListener("input", validateInput);
let numberTypeSelect = document.getElementById('unit1');
numberTypeSelect.addEventListener("change", validateInput);

function validateInput() {

    numberTypeSelect = document.getElementById('unit1');
    let selectedType = numberTypeSelect.value;
    let inputValue = inputField.value;
    let expression;
    // Regular expression to match only 0s and 1s
    switch (selectedType) {
        case '2':
            expression = /^[01]+$/;
            break;
        case '16':
            expression = /^[0-9A-Fa-f]+$/;
            break;
        default:
            expression = /^\d+$/;
            break;
    }
    let isValid = true;

    if (expression.test(inputValue)) {
        isValid = true;
    } else {
        isValid = false;
    }
    let button = document.getElementById("convertButton");
    button.disabled = !isValid;

    inputField.oninput = () => {
        inputField.style.backgroundColor = (isValid || !inputValue) ? 'white' : 'rgba(215, 151, 151, 0.917)';
    }

};
