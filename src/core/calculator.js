const symbols = {
  '+': '+',
  '-': '-',
  '/': '÷',
  '*': '×',
}

export class Calculator {
  constructor(onUpdateDisplay, onUpdateExpression) {
    this.onUpdateDisplay = onUpdateDisplay
    this.onUpdateExpression = onUpdateExpression
    this.currentValue = '0'
    this.previousValue = ''
    this.operator = ''
    this.shouldResetDisplay = false
    this.updateAll()
  }

  updateDisplay() {
    const value = this.currentValue.replace('.', ',')
    this.onUpdateDisplay(value)
  }

  updateExpression(fullOutput = false) {
    const operator = symbols[this.operator] || this.operator
    const previousValue = this.previousValue.replace('.', ',').replace(/,$/, '')
    const currentValue = this.currentValue.replace('.', ',').replace(/,$/, '')

    const value = !fullOutput
      ? previousValue + operator
      : previousValue + operator + currentValue + '='

    this.onUpdateExpression(value)
  }

  updateAll() {
    this.updateDisplay()
    this.updateExpression()
  }

  appendNumber(num) {
    if (this.shouldResetDisplay) {
      this.currentValue = num
      this.shouldResetDisplay = false
      this.updateExpression()
    } else {
      if (this.currentValue === '0') {
        this.currentValue = num
      } else {
        this.currentValue = this.currentValue + num
      }
    }
    this.updateDisplay()
  }

  appendDecimal() {
    if (this.shouldResetDisplay) {
      this.currentValue = '0.'
      this.shouldResetDisplay = false
    } else if (!this.currentValue.includes('.')) {
      this.currentValue += '.'
    }
    this.updateAll()
  }

  clear() {
    this.currentValue = '0'
    this.previousValue = ''
    this.operator = ''
    this.shouldResetDisplay = false
    this.updateAll()
  }

  toggleSign() {
    if (this.shouldResetDisplay) {
      this.updateExpression()
    }
    this.currentValue = String(-parseFloat(this.currentValue))
    this.updateDisplay()
  }

  percentage() {
    if (this.operator === '+' || this.operator === '-') {
      this.currentValue = String(
        (parseFloat(this.previousValue) * parseFloat(this.currentValue)) / 100,
      )
    } else {
      this.currentValue = String(parseFloat(this.currentValue) / 100)
      this.updateDisplay()
      this.updateExpression()
    }

    this.calculate(true)
  }

  setOperator(op) {
    if (this.operator && !this.shouldResetDisplay) {
      this.calculate()
    }
    this.operator = op
    this.previousValue = this.currentValue

    this.updateExpression()
    this.shouldResetDisplay = true
  }

  calculate(fullOutput = false) {
    if (!this.operator || !this.previousValue) return

    const prev = parseFloat(this.previousValue)
    const current = parseFloat(this.currentValue)
    let result

    switch (this.operator) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '/':
        result = current !== 0 ? prev / current : 'Error'
        break
      default:
        return
    }

    this.updateExpression(fullOutput)
    this.currentValue = String(result)
    this.updateDisplay()

    this.operator = ''
    this.previousValue = ''
    this.shouldResetDisplay = true
  }

  handleAction(action, value = null) {
    switch (action) {
      case 'number':
        this.appendNumber(value)
        break
      case 'decimal':
        this.appendDecimal()
        break
      case 'clear':
        this.clear()
        break
      case 'toggle-sign':
        this.toggleSign()
        break
      case 'percentage':
        this.percentage()
        break
      case 'operator':
        this.setOperator(value)
        break
      case 'equals':
        this.calculate(true)
        break
    }
  }
}
