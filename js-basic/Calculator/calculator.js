const prevOperand = document.querySelector('.previous-operand');
const currOperand = document.querySelector('.current-operand');
const keys = document.querySelector('.keys');

function appendNumber(currOperand, keyContent) {
    if (currOperand.textContent === '') {
        currOperand.textContent = keyContent;
    }
    else {
        currOperand.textContent += keyContent;
    }      
}

function appendDecimal(currOperand, keyContent) {
    if (currOperand.textContent.includes('.')) return;
    currOperand.textContent = currOperand.textContent + keyContent;
}

function chooseOperation(prevOperand, currOperand, keyContent) {
    if (currOperand.textContent === '') return
    prevOperand.textContent = `${currOperand.textContent} ${keyContent}`;
    currOperand.textContent = '';
}

function calculate(prevOperand, currOperand) {
    let computation;
    let prevContent = prevOperand.textContent;
    let currContent = currOperand.textContent;

    if (prevContent === '' || currContent === '') return

    prev = parseFloat(prevContent);
    curr = parseFloat(currContent);

    switch (true) {
        case prevContent.includes('+'): 
            computation = prev + curr;
            break
        case prevContent.includes('-'):
            computation = prev - curr;
            break
        case prevContent.includes('×'):
            computation = prev * curr;
            break
        case prevContent.includes('÷'):
            computation = prev / curr;
            break
    }

    currOperand.textContent = computation;
    prevOperand.textContent = '';
}

function deleteFunction(curr) {
    if (curr.textContent === '') return
    curr.textContent = curr.textContent.slice(0, -1);
}

function clearFunction(prev, curr) {
    prev.textContent = '';
    curr.textContent = '';
}

keys.addEventListener('click', (event) => {
    if (event.target.matches('button')){
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;

        switch (action) {
            case 'decimal':
                appendDecimal(currOperand, keyContent);               
                break
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                chooseOperation(prevOperand, currOperand, keyContent);
                break
            case 'calculate':
                calculate(prevOperand, currOperand);
                break
            case 'delete':
                deleteFunction(currOperand);
                break
            case 'clear':
                clearFunction(prevOperand, currOperand);
                break
            default:
                appendNumber(currOperand, keyContent);
        }
    }
});

//* ------------------------------------------------------------------

/*
function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    //   console.log(integerDisplay);
    } 
    else {
      integerDisplay = integerDigits.toLocaleString('en');
    //   console.log(integerDisplay);
    }

    if (decimalDigits != null) {
    //   console.log(`${integerDisplay}.${decimalDigits}`);
      return `${integerDisplay}.${decimalDigits}`;
    } 
    else {
    //   console.log(integerDisplay);
      return integerDisplay;
    }
}
*/

/*
function resetNumber() {
    keys.addEventListener('click', (event) => {
        if (event.target.matches('button')) {
            const action = keys.dataset.action;
            if (action === 'add' || 'subtract' || 'multiply' || 'divide')
                currOperand.textContent = event.target.textContent;
        }
    })
}*/

