import * as basicOps from '/modules/basicOps.js';

const upperDisplay = document.querySelector('.upper-box');
const lowerDisplay = document.querySelector('.lower-box');
const buttons = document.querySelectorAll('.btn');

let x = null;
let y = null;
let sign = '';
let result = null;
let detectEquals = 0;
let errorDetect = 0;

buttons.forEach(button => button.addEventListener('click', e => {

    if (e.target.innerText === 'CLEAR') {
        x = null;
        y = null;
        result = null;
        sign = '';
        detectEquals = 0;
        errorDetect = 0;
        lowerDisplay.textContent = '';
        upperDisplay.textContent = '';
        lowerDisplay.style = 'font-size: 1.45em;';
    }

    if (errorDetect) {
        return;
    }

    if (e.target.innerText.search(/[0-9]/) === 0) {
        if (lowerDisplay.textContent == result && detectEquals !== 0) {
            lowerDisplay.textContent = '';
            upperDisplay.textContent = '';
        }
        if(detectEquals === 1) {
            detectEquals--;
        }
        lowerDisplay.textContent += e.target.innerText;
    };

    if (e.target.innerText.search(/[/*\-+]/) === 0) {
        if (upperDisplay.textContent.includes('+') || upperDisplay.textContent.includes('-') || upperDisplay.textContent.includes('*') || upperDisplay.textContent.includes('/')) {
            if (lowerDisplay.textContent.includes('-')) {
            }

            if(detectEquals) {
                x = result;
                upperDisplay.textContent = `${x} ${e.target.innerText}`;
                y = +lowerDisplay.textContent;
                detectEquals--;
                console.log('detectEquals decreased');
                return;
            }
            
            y = +lowerDisplay.textContent;
            result = operate(+x,+y,sign);
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
        if (detectEquals >= 1) {
            lowerDisplay.textContent = 'ERROR, press CLEAR to reset';
            lowerDisplay.style = 'font-size: 1em'
            upperDisplay.textContent = '';
            errorDetect++;
            return;
        }
        if (x !== null) {
            detectEquals++;
            y = +lowerDisplay.textContent;
            result = operate(x,y,sign);
            upperDisplay.textContent = `${x} ${sign} ${y}`;
            lowerDisplay.textContent = result;
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