class Model {
    constructor() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
        this.result = 0
        this.isResult = false  
        this.resultString = ''
    }

    getResultString() {
        return this.resultString
    }
    appendCharacters(char) {
        // Clear screen when typing number after getting result
        if (this.isResult) {
            this.clear() 
        } 

        // Each number must have one decimal point
        if (char === '.' && this.previousOperand.toString().includes('.')) {
            if (this.operation === undefined) return
        }
        if (char === '.' && this.currentOperand.toString().includes('.')) {
            if (this.operation) return
        }
            
        if (this.operation === undefined) this.previousOperand += char
        else this.currentOperand += char
        
        this.resultString = this.resultString.toString() + char.toString()
    }
    chooseOperation(operation) {
        if (this.previousOperand === '' && this.currentOperand === '') {
            this.previousOperand = '0'
            this.operation = operation
            this.resultString = `${this.previousOperand} ${this.operation} `
        }
        else if (this.previousOperand !== '' && this.currentOperand == '') {
            this.operation = operation
            this.resultString = `${this.previousOperand} ${this.operation} `
        }
        else if (this.previousOperand !== '' && this.currentOperand !== '') {
            this.calculate()
            this.previousOperand = this.result
            this.currentOperand = ''
            this.operation = operation
            this.resultString = `${this.result} ${this.operation} `          
        }
    }
    calculate() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
      
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '×':
                computation = prev * curr
                break
            case '÷':
                if (this.currentOperand === '0') {
                    alert('Can not divide by 0')
                    this.clear()
                }
                else {
                    computation = Math.round((prev / curr + Number.EPSILON) * 10e9) / 10e9
                }
                break
            default:
                return
        }

        this.result = computation
        this.resultString = this.result
    }
    delete() {
       this.resultString = this.resultString.toString().slice(0, -1)
    }
    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
        this.result = 0
        this.isResult = false
        this.resultString = ''
    }
}

class View {
    constructor() {
        this.main = this.getElement('.main')

        this.calculator = this.createElement('div', 'calculator')

        this.screen = this.createElement('div', 'screen')
        this.currOperandTextElement = this.createElement('div', 'current-operand')
        this.screen.append(this.currOperandTextElement)

        this.keys = this.createElement('div', 'keys')

        this.addBtn = this.createElement('button', 'operator-key', '+', '+')
        this.substractBtn = this.createElement('button', 'operator-key', '-', '-')
        this.multiplyBtn = this.createElement('button', 'operator-key', '×', '×')
        this.divideBtn = this.createElement('button', 'operator-key', '÷', '÷')
    
        this.key7 = this.createElement('button', 'digit-key', '7', '7')
        this.key8 = this.createElement('button', 'digit-key', '8', '8')
        this.key9 = this.createElement('button', 'digit-key', '9', '9')
        this.clearBtn = this.createElement('button', 'clear-key', 'AC', 'clear')

        this.key4 = this.createElement('button', 'digit-key', '4', '4')
        this.key5 = this.createElement('button', 'digit-key', '5', '5')
        this.key6 = this.createElement('button', 'digit-key', '6', '6')
        
        this.key1 = this.createElement('button', 'digit-key', '1', '1')
        this.key2 = this.createElement('button', 'digit-key', '2', '2')
        this.key3 = this.createElement('button', 'digit-key', '3', '3')
        
        this.key0 = this.createElement('button', 'digit-key', '0', '0')
        this.decimalBtn = this.createElement('button', 'decimal-key', '.', '.')
        this.delBtn = this.createElement('button', 'del-key', 'DEL', 'DEL')

        this.equalBtn = this.createElement('button', 'equal-sign-key', '=', '=')

        this.keys.append(this.addBtn, this.substractBtn, this.multiplyBtn, this.divideBtn)
        this.keys.append(this.key7, this.key8, this.key9, this.clearBtn)
        this.keys.append(this.key4, this.key5, this.key6)
        this.keys.append(this.key1, this.key2, this.key3)
        this.keys.append(this.key0, this.decimalBtn, this.delBtn)
        this.keys.append(this.equalBtn)

        this.calculator.append(this.screen, this.keys)
        this.main.append(this.calculator)
    }

    createElement(selector, className, textContent, value) {
        const element = document.createElement(selector)
        if (className) element.classList.add(className)
        if (textContent) element.textContent = textContent
        if (value) element.value = value
        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)
        return element
    }

    updateDisplay(value) {
        this.currOperandTextElement.textContent = value
    }

    //* Event listeners
    bindAppendCharacters(handler) {
        this.keys.addEventListener('click', e => {
            if (e.target.className === 'digit-key' || e.target.className === 'decimal-key') {
                const keyValue = e.target.value
                handler(keyValue)
            }
        })
    }
    bindChooseOperation(handler) {
        this.keys.addEventListener('click', e => {
            if (e.target.className === 'operator-key') {
                const keyValue = e.target.value
                handler(keyValue)
            }
        })
    }
    bindCalculate(handler) {
        this.keys.addEventListener('click', e => {
            if (e.target.className === 'equal-sign-key') {
                handler()
            }
        })
    }
    bindDelete(handler) {
        this.keys.addEventListener('click', e => {
            if (e.target.className === 'del-key') {
                handler()
            }
        })
    }
    bindClear(handler) {
        this.keys.addEventListener('click', e => {
            if (e.target.className === 'clear-key') {
                handler()
            }
        })
    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.view.bindAppendCharacters(this.handleBindAppendCharacters)
        this.view.bindChooseOperation(this.handleChooseOperation)
        this.view.bindCalculate(this.handleCalculate)
        this.view.bindDelete(this.handleDelete)
        this.view.bindClear(this.handleClear)
    }

    handleBindAppendCharacters = (char) => {
        this.model.appendCharacters(char)
        this.view.updateDisplay(this.model.getResultString())
    }
    handleChooseOperation = (operation) => {
        this.model.chooseOperation(operation)
        this.view.updateDisplay(this.model.getResultString())
    }
    handleCalculate = () => {
        this.model.calculate()
        this.view.updateDisplay(this.model.getResultString())
        this.model.isResult = true  
    }
    handleDelete = () => {
        this.model.delete()
        this.view.updateDisplay(this.model.getResultString())
    }
    handleClear = () => {
        this.model.clear()
        this.view.updateDisplay(this.model.getResultString())
    }
}

const cal1 = new Controller(new Model(), new View())
const cal2 = new Controller(new Model(), new View())
const cal3 = new Controller(new Model(), new View())
const cal4 = new Controller(new Model(), new View())