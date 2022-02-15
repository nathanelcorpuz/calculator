import * as basicOps from '/modules/basicOps.js';

const textContainer = document.querySelector('.text-container');

const htmlElem = document.querySelector('html');
htmlElem.addEventListener('keypress', e => {
    const regExAlphabet = /[A-Za-z]/;
    if (e.key.search(regExAlphabet) === -1) textContainer.textContent += e.key;
    else return;
})