import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Header from './components/common/Header'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import Dashboard from './components/dashboard/Dashboard'
import MapView from './components/map/MapView'
import LoadingSpinner from './components/common/LoadingSpinner'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-5xl">🏥</span>
          </div>
          <h1 className="text-5xl font-bold text-secondary mb-4">
            Welcome to Saniat Rmel Hospital
          </h1>
          <p className="text-xl text-text mb-8">
            Your trusted healthcare partner in Tetouan, Morocco
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Patient Login
            </a>
            <a
              href="/signup"
              className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Create Account
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold text-secondary mb-2">Waiting Lists</h3>
            <p className="text-text">Join department queues in real-time</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🩸</div>
            <h3 className="text-xl font-bold text-secondary mb-2">Blood Bank</h3>
            <p className="text-text">Check blood type availability</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-bold text-secondary mb-2">Doctors</h3>
            <p className="text-text">View doctor availability and specializations</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

