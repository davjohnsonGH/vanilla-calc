(function () {

    const input = document.getElementsByTagName('input');
    let inputString = '';

    const init = () => {
        attachEventListeners();
        const test = prompt('test');
        console.log(test, 'answer')
    };
    const attachEventListeners = () => {
        const buttons = document.getElementsByTagName('button');

        for (let button of buttons) {
            button.addEventListener('click', buttonClick);
        };
    };
    const buttonClick = (evt) => {
        updateInput(evt.target.value);
    };
    // a little buggy
    const updateInput = (value) => {
        if (value !== '=') {
            inputString += value;
            input[0].value = inputString;
        } else {
            input[0].value = calculate();
        };
    };
    const calculate = () => {
        const model = returnModel();
        let sum = +model.numbers.shift();
        while (model.numbers.length) {
            const number = model.numbers.shift();
            const operation = model.operations.shift();
            operation === '+' ? sum += +number : sum -= +number;
        };
        return sum;
    };
    const returnModel = () => {
        const model = {};
        model.numbers = returnNumbers();
        model.operations = returnOperations();
        return model;
    };
    const returnNumbers = () => {
        const numbers = []; 
        let number = '';
        for (let char of inputString) {
            if (number.length > 0 && char === '+' || char === '-') {
                numbers.push(number);
                number = '';
            };
            if (char !== '+' && char !== '-') number += char;
        };
        numbers.push(number)
        return numbers;
    };
    const returnOperations = () => {
        const operations = [];
        for (let char of inputString) {
            if (char === '+' || char === '-') operations.push(char);
        };
        return operations;
    };    

    window.onload = () => { init(); };

})();
