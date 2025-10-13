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
        result = this.add(prev, current)
        break
      case '-':
        result = this.subtract(prev, current)
        break
      case '*':
        result = this.multiply(prev, current)
        break
      case '/':
        result = current !== 0 ? this.divide(prev, current) : 'Error'
        break
      default:
        return
    }

    result = isNaN(result) ? 'Error' : result

    this.updateExpression(fullOutput)
    this.currentValue = String(result)
    this.updateDisplay()

    this.operator = ''
    this.previousValue = ''
    this.shouldResetDisplay = true
  }

  getPrecision(value) {
    const sValue = value.toString()
    const parts = sValue.split('.')
    return parts[1] ? parts[1].length : 0
  }

  getFactor(a, b, multiply = false) {
    const aPrecision = this.getPrecision(a)
    const bPrecision = this.getPrecision(b)
    let p

    if (multiply) {
      p = aPrecision + bPrecision
    } else {
      p = aPrecision > bPrecision ? aPrecision : bPrecision
    }

    return [...Array(p)].reduce((acc) => acc * 10, 1)
  }

  add(a, b) {
    const factor = this.getFactor(a, b)
    return (a * factor + b * factor) / factor
  }

  subtract(a, b) {
    const factor = this.getFactor(a, b)
    return (a * factor - b * factor) / factor
  }

  multiply(a, b) {
    const factor = this.getFactor(a, b, true)
    return (a * factor * (b * factor)) / (factor * factor)
  }

  divide(a, b) {
    const factor = this.getFactor(a, b)
    return (a * factor) / (b * factor)
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
