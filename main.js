import * as basicOps from '/modules/basicOps.js';

const upperDisplay = document.querySelector('.upper-box');
const lowerDisplay = document.querySelector('.lower-box');
const buttons = document.querySelectorAll('.btn');

let x = null;
let y = null;
let sign = '';
let result = null;

buttons.forEach(button => button.addEventListener('click', e => {

    if (e.target.innerText === 'CLEAR') {
        x = null;
        y = null;
        result = null;
        sign = '';
        
        lowerDisplay.textContent = '';
        upperDisplay.textContent = '';
    }

    if (e.target.innerText.search(/[0-9]/) === 0) {
        if (lowerDisplay.textContent == result) {
            lowerDisplay.textContent = '';
            upperDisplay.textContent = '';
        }
        lowerDisplay.textContent += e.target.innerText;
    };

    if (e.target.innerText.search(/[/*\-+]/) === 0) {
        if (upperDisplay.textContent.includes('+') || upperDisplay.textContent.includes('-') || upperDisplay.textContent.includes('*') || upperDisplay.textContent.includes('/')) {
            y = +lowerDisplay.textContent;
            result = operate(x,y,sign);
            console.log(result);
            lowerDisplay.textContent = result;
            sign = e.target.innerText;
            x = +lowerDisplay.textContent;
            lowerDisplay.textContent = '';
            upperDisplay.textContent = `${x} ${sign}`;
            return;
        }
        sign = e.target.innerText;
        x = +lowerDisplay.textContent;
        lowerDisplay.textContent = '';
        upperDisplay.textContent = `${x} ${sign}`;
    }

    if (e.target.innerText === '=') {
        if (x !== null) {
            y = +lowerDisplay.textContent;
            result = operate(x,y,sign);
            upperDisplay.textContent = `${x} ${sign} ${y}`;
            lowerDisplay.textContent = result;
            x = null;
            y = null;
        }
    }

}));

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
