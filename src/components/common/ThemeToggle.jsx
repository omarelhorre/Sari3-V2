import { useTheme } from '../../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (toggleTheme) {
      toggleTheme()
      // Force immediate update
      const root = document.documentElement
      const newTheme = theme === 'light' ? 'dark' : 'light'
      if (newTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      style={{ zIndex: 9999 }}
      className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-br from-primary via-primary to-accent dark:from-gray-700 dark:to-gray-800 rounded-full shadow-2xl hover:shadow-primary/50 dark:hover:shadow-gray-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20 dark:border-gray-600/30 backdrop-blur-sm group cursor-pointer"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Moon Icon for Dark Mode */}
      {theme === 'light' ? (
        <i className="fas fa-moon text-white text-xl group-hover:rotate-12 transition-transform duration-300 pointer-events-none z-10 relative"></i>
      ) : (
        <i className="fas fa-sun text-yellow-300 text-xl group-hover:rotate-180 transition-transform duration-500 pointer-events-none z-10 relative"></i>
      )}
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/20 dark:bg-gray-600/20 blur-xl group-hover:bg-primary/30 dark:group-hover:bg-gray-600/30 transition-all duration-300 pointer-events-none"></div>
    </button>
  )
}

