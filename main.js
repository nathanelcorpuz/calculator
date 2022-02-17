import * as basicOps from '/modules/basicOps.js';

const upperDisplay = document.querySelector('.upper-display');
const lowerDisplay = document.querySelector('.lower-display');
const buttons = document.querySelectorAll('.btn');

let x = null;
let y = null;
let sign = '';
let result1 = null;
let result2 = null;

buttons.forEach(button => button.addEventListener('click', e => {

    if (e.target.innerText === 'CLEAR') {
        upperDisplay.textContent = '';
        lowerDisplay.textContent = '';
        x = null;
        y = null;
        sign = '';
        result1 = null;
        result2 = null;
    }

    else if (e.target.innerText === 'DEL') {
        lowerDisplay.textContent = lowerDisplay.textContent.slice(0, lowerDisplay.textContent.length - 1);
    }

    else if (e.target.innerText.search(/[0-9]/) === 0) {
        if (lowerDisplay.textContent.includes('=')) lowerDisplay.textContent = '';
        lowerDisplay.textContent += e.target.innerText;
    }

    else if (e.target.innerText === '.') {
        if (lowerDisplay.textContent.includes('.')) return;
        lowerDisplay.textContent += '.';
    }

    else if (e.target.innerText === '=') {

        if (result1 != null) {
            console.log('this came from a basic ops func');
        }
        else if (x != null) {
            y = +lowerDisplay.textContent;
            result1 = operate(x,y,sign);
            upperDisplay.textContent = `${x} ${sign} ${y}`;
            lowerDisplay.textContent = `= ${result1}`;
        }
    }

    else if (e.target.innerText.search(/[/*\-+]/ === 0)) {   
        if (x == null) {
            x = +lowerDisplay.textContent;
            sign = e.target.innerText;
            upperDisplay.textContent = `${x} ${sign}`;
        }
        else if (lowerDisplay.textContent.includes('=')) {
            console.log('this came from an equal operation');
            sign = e.target.innerText;
            upperDisplay.textContent = `${result1} ${sign}`;
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
