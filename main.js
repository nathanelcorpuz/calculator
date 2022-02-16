import * as basicOps from '/modules/basicOps.js';

const upperBox = document.querySelector('.upper-box');
const lowerBox = document.querySelector('.lower-box');
const htmlElem = document.querySelector('html');
const buttons = document.querySelectorAll('.btn');

let lowerBoxValue = '';
let upperBoxValue = '';
let x = 0;
let y = 0;
let sign = '';
let result = 0;

const regExAlphabet = /[A-Za-z]/;
const regExOperations = /[+\-*/]/;

buttons.forEach(button => button.addEventListener('click', e => {
    if (e.target.innerText.search(/[0-9]/) === 0) {
        if (lowerBox.textContent == result) {
            lowerBox.textContent = '';
        }
        lowerBoxValue += e.target.innerText;
        lowerBox.textContent += e.target.innerText;
        return;
    }

    else if (e.target.innerText === 'C') {
        x = 0;
        y = 0;
        result = 0;
        sign = '';
        lowerBox.textContent = '';
        lowerBoxValue = '';
    }

    else if (e.target.innerText === '=') {
        if (x !== 0) {
            y = +lowerBoxValue;
            lowerBoxValue = '';
            result = operate(x,y,sign);
            lowerBox.textContent = result;
            x = 0;
            y = 0;
            return;
        }
    }

    else if (e.target.innerText.search(regExOperations) === 0) {
        sign = e.target.innerText;
        if (x !== 0) {
            y = +lowerBoxValue;
            lowerBoxValue = '';
            result = operate(x,y,sign);
            lowerBox.textContent = result;
            x = 0;
            return;
        }
        x = +lowerBoxValue;
        lowerBoxValue = '';
        lowerBox.textContent = '';
    }
}))

htmlElem.addEventListener('keypress', e => {

});

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