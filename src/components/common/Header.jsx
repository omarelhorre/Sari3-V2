import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut()
  }

  const getUserDisplayName = () => {
    if (user?.role === 'admin' || user?.user_metadata?.role === 'admin') {
      return user.hospitalName || 'Admin'
    }
    return user?.email?.split('@')[0] || user?.user_metadata?.full_name || 'User'
  }

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-primary/10 sticky top-0 z-50">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <i className="fas fa-hospital text-white text-2xl"></i>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Sarii Space
              </span>
              {user && (
                <div className="hidden sm:flex items-center group ml-4">
                  <div className="flex items-center space-x-2.5 px-4 py-2 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 backdrop-blur-sm rounded-xl border border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-primary/30">
                    <div className="relative flex-shrink-0">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse shadow-sm"></div>
                      <div className="absolute inset-0 w-2.5 h-2.5 bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="flex items-center overflow-hidden">
                      <span className="text-sm font-semibold text-secondary whitespace-nowrap tracking-tight">
                        Logged in
                      </span>
                      <span className="text-sm font-semibold text-secondary/80 whitespace-nowrap max-w-0 group-hover:max-w-[300px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden ml-1.5">
                        {' '}as <span className="text-primary font-bold">{getUserDisplayName()}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Link>

          <nav className="flex items-center space-x-2">
            {user && (
              <>
                {user.role === 'admin' || user.user_metadata?.role === 'admin' ? (
                  <Link 
                    to="/admin/dashboard" 
                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all font-semibold backdrop-blur-sm border border-red-500/20"
                  >
                    Admin Dashboard
                  </Link>
                ) : null}
              </>
            )}
            <Link
              to="/"
              onClick={handleHomeClick}
              className="px-4 py-2.5 text-text hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl transition-all font-medium hover:scale-105 active:scale-95"
            >
              Home
            </Link>
            <Link 
              to="/map" 
              className="px-4 py-2.5 text-text hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl transition-all font-medium hover:scale-105 active:scale-95"
            >
              Locations
            </Link>
            <button
              onClick={() => scrollToSection('contributors')}
              className="px-4 py-2.5 text-text hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl transition-all font-medium hover:scale-105 active:scale-95"
            >
              Contributors
            </button>
            <button
              onClick={() => scrollToSection('special-thanks')}
              className="px-4 py-2.5 text-text hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl transition-all font-medium hover:scale-105 active:scale-95"
            >
              Special Thanks
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2.5 text-text hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl transition-all font-medium hover:scale-105 active:scale-95"
            >
              Contact
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-gradient-to-r from-secondary to-primary text-white rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all font-semibold backdrop-blur-sm border border-primary/20"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all font-semibold backdrop-blur-sm border border-primary/20"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
