import './styles/styles.css'
import { ThemeManager } from './core/theme-manager'
import { Calculator } from './core/calculator'

function initializeTheme() {
  const themeManager = new ThemeManager()
  themeManager.initializeThemeControl()
}

function initializeCalculator() {
  const displayElement = document.getElementById('display')
  const expressionElement = document.getElementById('expression')

  const handleUpdateDisplay = (value) => {
    displayElement.value = value
  }

  const handleUpdateExpression = (value) => {
    expressionElement.value = value
  }

  const calculator = new Calculator(handleUpdateDisplay, handleUpdateExpression)

  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action
      const value = button.dataset.number || button.dataset.operator
      calculator.handleAction(action, value)
    })
  })

  document.addEventListener('keydown', (e) => {
    const key = e.key

    if (key >= '0' && key <= '9') {
      calculator.handleAction('number', key)
    } else if (key === '.') {
      calculator.handleAction('decimal')
    } else if (key === 'Enter' || key === '=') {
      e.preventDefault()
      calculator.handleAction('equals')
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      calculator.handleAction('clear')
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      calculator.handleAction('operator', key)
    } else if (key === 'F9') {
      calculator.handleAction('toggle-sign')
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme()
  initializeCalculator()
})
