class Calculator {
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

clear(){
this.currentOperand = ''
this.previousOperand = ''
this.operation = undefined
}

delete(){
this.currentOperand = this.currentOperand.toString().slice(0,-1)
}

appendNumber(number){
    if(number === '.' && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operation){
    if(this.currentOperand === '') return
    if(this.previousOperand !== ''){
        this.compute()
    }
this.operation = operation
this.previousOperand = this.currentOperand
this.currentOperand = ""
}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

updateDisplay(){
this.currentOperandElement.innerText = 
this.getDisplayNumber(this.currentOperand)
if(this.operation != null) {
    this.previousOperandElement.innerText = 
    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
} else {
    this.previousOperandElement.innerText = ''
  }
}

compute() {
let computation
const prev = parseFloat(this.previousOperand)
const current = parseFloat(this.currentOperand)
if(isNaN(prev) || isNaN(current)) return
switch (this.operation) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '÷':
      computation = prev / current
      break
    default:
      return
  }
this.currentOperand = computation
this.operation = undefined
this.previousOperand ='Result'
}

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')

const firstCalculator = new Calculator(previousOperand, currentOperand)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        firstCalculator.appendNumber(button.innerText)
        firstCalculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        firstCalculator.chooseOperation(button.innerText)
        firstCalculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
firstCalculator.compute()
firstCalculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
firstCalculator.clear()
firstCalculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {

firstCalculator.delete()
firstCalculator.updateDisplay()
        
})