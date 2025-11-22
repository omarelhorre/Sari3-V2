import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../common/LoadingSpinner'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: signInError } = await signIn(username, password)

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    if (data?.user) {
      // Check if the user is an admin and redirect to admin dashboard
      const user = data.user
      if (user.role === 'admin' || user.user_metadata?.role === 'admin' || user.app_metadata?.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate(redirectTo)
      }
    } else {
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(76,175,80,0.1),transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(67,160,71,0.1),transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-md w-full bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-primary/20 animate-fade-in relative z-10">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl hover:scale-110 hover:rotate-3 transition-all duration-300 border-4 border-white/20">
            <i className="fas fa-hospital text-white text-5xl"></i>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-4 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-text/80 text-lg font-medium">Sign in to your patient portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl font-medium shadow-md">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-text mb-2.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white/50 backdrop-blur-sm hover:border-primary/50 font-medium"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-text mb-2.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white/50 backdrop-blur-sm hover:border-primary/50 font-medium"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary via-primary to-accent text-white py-4 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center text-lg border border-primary/20 backdrop-blur-sm"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-text/80 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-accent font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform inline-block">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
