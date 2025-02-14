document.addEventListener('DOMContentLoaded', function () {
    const resultDisplay = document.getElementById('result');
    const currentOperation = document.getElementById('current-operation');
    const historyContainer = document.getElementById('history-container');
    const historyList = document.getElementById('history-list');
    const body = document.body;
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let history = [];
 
    const buttons = document.querySelectorAll('.calc-btn');
   
    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button));
    });
 
    const historyButton = document.getElementById('history');
    historyButton.addEventListener('click', toggleHistory);
 
    const themeButton = document.getElementById('theme');
    themeButton.addEventListener('click', toggleTheme);
 
    const clearHistoryButton = document.getElementById("clear-history");
    if (clearHistoryButton) {
        clearHistoryButton.addEventListener("click", function () {
            historyList.innerHTML = ""; // Borra el contenido de la lista
            localStorage.removeItem("calcHistory"); // Elimina el historial almacenado
        });
    }
 
    function handleButtonClick(button) {
        const value = button.innerText;
 
        if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (value === 'AC') {
            clear();
        } else if (value === '⌫') {
            backspace();
        } else if (value === '+/-') {
            toggleSign();
        } else if (value === '%') {
            percentage();
        } else if (value === '=') {
            calculate();
        } else {
            chooseOperation(value);
        }
 
        updateDisplay();
    }
 
    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput = currentInput.toString() + number.toString();
        updateCurrentOperationDisplay();
    }
 
    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateCurrentOperationDisplay();
    }
 
    function backspace() {
        currentInput = currentInput.slice(0, -1);
        updateCurrentOperationDisplay();
    }
 
    function toggleSign() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateCurrentOperationDisplay();
        }
    }
 
    function percentage() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateCurrentOperationDisplay();
        }
    }
 
    function chooseOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
        updateCurrentOperationDisplay();
    }
 
    function calculate() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
 
        if (isNaN(prev) || isNaN(current)) return;
 
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'X':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
 
        currentInput = computation.toString();
        const operationString = `${prev} ${operation || ''} ${current} = ${computation}`;
        history.push(operationString);
        updateHistoryDisplay();
 
        operation = null;
        previousInput = '';
        updateCurrentOperationDisplay();
    }
 
    function updateDisplay() {
        resultDisplay.innerText = currentInput || '0';
    }
 
    function updateCurrentOperationDisplay() {
        currentOperation.innerText = previousInput + (operation || '') + currentInput;
    }
 
    function toggleHistory() {
        historyContainer.classList.toggle('visible');
    }
 
    function toggleTheme() {
        calculator.classList.toggle('inverted');
        body.classList.toggle('inverted-background');
 
        const themeButton = document.getElementById('theme');
        if (calculator.classList.contains('inverted')) {
            themeButton.innerText = '☀️';
        } else {
            themeButton.innerText = '🌙';
        }
    }
 
    function updateHistoryDisplay() {
        historyList.innerHTML = '';
        history.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    }
 
});