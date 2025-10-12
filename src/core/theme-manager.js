export class ThemeManager {
  constructor() {
    this.currentTheme = this.loadTheme()
    this.applyTheme(this.currentTheme)
  }

  loadTheme() {
    return localStorage.getItem('theme') || 'dark'
  }

  saveTheme(theme) {
    localStorage.setItem('theme', theme)
  }

  applyTheme(theme) {
    document.body.setAttribute('data-theme', theme)
    this.currentTheme = theme
    this.saveTheme(theme)
    this.updateControl(theme)
  }

  updateControl(theme) {
    const control = document.querySelector('#theme-control')
    control.textContent = theme === 'dark' ? '☼' : '☾'
  }

  initializeThemeControl() {
    const control = document.querySelector('#theme-control')
    control.addEventListener('click', () => {
      this.applyTheme(this.currentTheme === 'dark' ? 'light' : 'dark')
    })
  }
}
