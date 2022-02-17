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

html.addEventListener('keydown', e => {
    calcLogicKeys(e)
})

buttons.forEach(button => button.addEventListener('click', e => {
    calcLogic(e);
}));

function calcLogicKeys(e) {
    if (e.key === 'CLEAR' || e.key === 'Escape') clearBtn();

    else if (e.key === 'DEL' || e.key === 'Backspace') delBtn(e);

    else if (e.key.search(/[0-9]/) === 0) {
        if (lowerDisplay.textContent.includes('=')) lowerDisplay.textContent = '';
        lowerDisplay.textContent += e.key;
    }

    else if (e.key === '.') {
        if (lowerDisplay.textContent.includes('.')) return;
        lowerDisplay.textContent += '.';
    }

    else if (e.key === '=' || e.key == 'Enter') {
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

    else if (e.key.search(/[/*\-+]/) === 0) {   
        if (x == null) {
            x = +lowerDisplay.textContent;
            sign = e.key;
            upperDisplay.textContent = `${x} ${sign}`;
        }
        else if (lowerDisplay.textContent.includes('=')) {
            sign = e.key;
            upperDisplay.textContent = `${result1} ${sign}`;
            x = +result1;
            y = null;
            result1 = null;
        }
        else if (x != null && y == null) {
            y = +lowerDisplay.textContent;
            result1 = operate(x,y,sign);
            sign = e.key;
            upperDisplay.textContent = `${result1} ${sign}`;
        }
        else if (x != null && y != null) {
            y = +lowerDisplay.textContent;
            result2 = operate(result1, y, sign);
            sign = e.key;
            upperDisplay.textContent = `${result2} ${sign}`;
            x = result2;
            y = null;
        }
        lowerDisplay.textContent = '';
    }
    checkError();
}

function calcLogic(e) {
    if (e.target.innerText === 'CLEAR') clearBtn();

    else if (e.target.innerText === 'DEL') delBtn(e);

    else if (e.target.innerText.search(/[0-9]/) === 0) {
        if (lowerDisplay.textContent.includes('=')) lowerDisplay.textContent = '';
        lowerDisplay.textContent += e.target.innerText;
    }

    else if (e.target.innerText === '.') {
        if (lowerDisplay.textContent.includes('.')) return;
        lowerDisplay.textContent += '.';
    }

    else if (e.target.innerText === '=') {
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

    else if (e.target.innerText.search(/[/*\-+]/) === 0) {   
        if (x == null) {
            x = +lowerDisplay.textContent;
            sign = e.target.innerText;
            upperDisplay.textContent = `${x} ${sign}`;
        }
        else if (lowerDisplay.textContent.includes('=')) {
            sign = e.target.innerText;
            upperDisplay.textContent = `${result1} ${sign}`;
            x = +result1;
            y = null;
            result1 = null;
        }
        else if (x != null && y == null) {
            y = +lowerDisplay.textContent;
            result1 = operate(x,y,sign);
            sign = e.target.innerText;
            upperDisplay.textContent = `${result1} ${sign}`;
        }
        else if (x != null && y != null) {
            y = +lowerDisplay.textContent;
            result2 = operate(result1, y, sign);
            sign = e.target.innerText;
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
    if (operation === '+') {
        return basicOps.add(x,y);
    }
    else if (operation === '-') {
        return basicOps.subtract(x,y);
    }
    else if (operation === '*') {
        return basicOps.multiply(x,y);
    }
    else if (operation === '/') {
        return basicOps.divide(x,y);
    }
}
