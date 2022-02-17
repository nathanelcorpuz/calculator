import * as basicOps from '/modules/basicOps.js';

const upperDisplay = document.querySelector('.upper-display');
const lowerDisplay = document.querySelector('.lower-display');
const buttons = document.querySelectorAll('.btn');
const html = document.querySelector('html');

let x = null;
let y = null;
let sign = '';
let result1 = null;
let result2 = null;
let keyPressed = '';

html.addEventListener('keydown', e => {
    keyPressed = e.key;
    calcLogic(keyPressed);
})

buttons.forEach(button => button.addEventListener('click', e => {
    keyPressed = e.target.innerText;
    calcLogic(keyPressed);
}));

function calcLogic(key) {
    if (key === 'CLEAR' || key === 'Escape') clearBtn();
    else if (key === 'DEL' || key === 'Backspace') delBtn();
    else if (key.search(/[0-9]/) === 0) {
        if (lowerDisplay.textContent.includes('=')) lowerDisplay.textContent = '';
        lowerDisplay.textContent += key;
    }
    else if (key === '.') {
        if (lowerDisplay.textContent.includes('.')) return;
        lowerDisplay.textContent += '.';
    }
    else if (key === '=' || key == 'Enter') {
        if (x != null && result1 != null) {
            y = +lowerDisplay.textContent;
            upperDisplay.textContent = `${result1} ${sign} ${y}`;
            result1 = operate(result1,y,sign);
            lowerDisplay.textContent = `= ${result1}`
        }
        else if (x != null) {
            y = +lowerDisplay.textContent;
            result1 = operate(x,y,sign);
            upperDisplay.textContent = `${x} ${sign} ${y}`;
            lowerDisplay.textContent = `= ${result1}`;
        }
    }
    else if (key.search(/[/*\-+]/) === 0) {   
        if (x == null) {
            x = +lowerDisplay.textContent;
            sign = key;
            upperDisplay.textContent = `${x} ${sign}`;
        }
        else if (lowerDisplay.textContent.includes('=')) {
            sign = key;
            upperDisplay.textContent = `${result1} ${sign}`;
            x = +result1;
            y = null;
            result1 = null;
        }
        else if (x != null && y == null) {
            y = +lowerDisplay.textContent;
            result1 = operate(x,y,sign);
            sign = key;
            upperDisplay.textContent = `${result1} ${sign}`;
        }
        else if (x != null && y != null) {
            y = +lowerDisplay.textContent;
            result2 = operate(result1, y, sign);
            sign = key;
            upperDisplay.textContent = `${result2} ${sign}`;
            x = result2;
            y = null;
        }
        lowerDisplay.textContent = '';
    }
    checkError();
}
function checkError() {
    if (lowerDisplay.textContent.includes('NaN') || upperDisplay.textContent.includes('NaN') || lowerDisplay.textContent.includes('Infinity') || upperDisplay.textContent.includes('Infinity')) {
        alert('Invalid input, please try again');
        clearBtn();
        return;
    }
}
function delBtn() {
    if (lowerDisplay.textContent.includes('=')) return;
    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, lowerDisplay.textContent.length - 1);
}
function clearBtn() {
    upperDisplay.textContent = '';
    lowerDisplay.textContent = '';
    x = null;
    y = null;
    sign = '';
    result1 = null;
    result2 = null;
}
function operate(x,y,operation) {
    if (operation === '+') return basicOps.add(x,y);
    else if (operation === '-') return basicOps.subtract(x,y);
    else if (operation === '*') return basicOps.multiply(x,y);
    else if (operation === '/') return basicOps.divide(x,y);
}
