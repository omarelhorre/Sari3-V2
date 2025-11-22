import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🏥</span>
            </div>
            <span className="text-xl font-bold text-secondary">Saniat Rmel Hospital</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-text hover:text-primary transition-colors">
              Home
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-text hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/map" className="text-text hover:text-primary transition-colors">
                  Map
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-text hidden sm:inline">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

