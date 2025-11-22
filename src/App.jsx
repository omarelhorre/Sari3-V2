import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/common/Header'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import Dashboard from './components/dashboard/Dashboard'
import MapView from './components/map/MapView'
import LoadingSpinner from './components/common/LoadingSpinner'
import HospitalCard from './components/hospital/HospitalCard'
import HospitalDetail from './components/hospital/HospitalDetail'
import AdminDashboard from './components/admin/AdminDashboard'
import ParticleBackground from './components/map/ParticleBackground'

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

function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  // Check if user is admin
  if (user && (user.role === 'admin' || user.user_metadata?.role === 'admin')) {
    return children
  }

  // Redirect non-admin users to login
  return <Navigate to="/login" replace />
}

function Home() {
  const hospitals = [
    {
      id: 'saniat-rmel',
      name: 'Saniat Rmel Hospital',
      location: 'Tetouan, Morocco',
    },
    {
      id: 'mohammed-6',
      name: 'Tetouan Medical center',
      location: 'Tetouan, Morocco',
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(76,175,80,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(67,160,71,0.1),transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(46,125,50,0.05),transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-36 h-36 bg-gradient-to-br from-primary via-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 border-4 border-white/20">
            <i className="fas fa-hospital text-white text-7xl"></i>
          </div>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-6 tracking-tight">
            Welcome to Sarii Space
          </h1>
          <p className="text-2xl text-text/90 mb-4 max-w-3xl mx-auto font-medium">
            Choose your hospital to access patient services
          </p>
          <p className="text-lg text-text/70 font-semibold">
            {hospitals.length} available hospitals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>

        {/* Contributors Tracker Section */}
        <div id="contributors" className="mb-16 py-16 px-6 rounded-3xl scroll-mt-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 shadow-xl">
          <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-12">
            Contributors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a 
              href="https://www.linkedin.com/in/reda-zakaria-70aa6a300/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 text-center border border-primary/20 hover:shadow-2xl hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <i className="fas fa-user-tie text-white text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">REDA ZAKARIA</h3>
                <p className="text-text/80 font-medium">3rd year engineering student at Computer Science</p>
              </div>
            </a>
            <a 
              href="https://www.linkedin.com/in/omarelhorreli/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 text-center border border-primary/20 hover:shadow-2xl hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <i className="fas fa-user-tie text-white text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">OMAR EL HORRE</h3>
                <p className="text-text/80 font-medium">3rd year engineering student at Computer Science</p>
              </div>
            </a>
          </div>
        </div>

        {/* Special Thanks Section */}
        <div id="special-thanks" className="mb-16 py-16 px-6 rounded-3xl scroll-mt-20 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent backdrop-blur-sm border border-accent/20 shadow-xl">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent mb-12">
            Special thanks to
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a 
              href="https://www.linkedin.com/in/hiba-el-bouhaddioui/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 text-center border border-accent/20 hover:shadow-2xl hover:scale-[1.02] hover:border-accent/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-red-400 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <i className="fas fa-heart text-white text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">HIBA EL BOUHADDIOUI</h3>
                <p className="text-text/80 font-medium">2nd year engineering student at preparatory classes</p>
              </div>
            </a>
            <a 
              href="https://www.linkedin.com/in/abdellah-raissouni/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 text-center border border-accent/20 hover:shadow-2xl hover:scale-[1.02] hover:border-accent/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-red-400 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <i className="fas fa-heart text-white text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">ABDELLAH RAISSOUNI</h3>
                <p className="text-text/80 font-medium">5th year engineering student at computer science</p>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div id="contact" className="mb-16 py-16 px-6 rounded-3xl scroll-mt-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 shadow-xl">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-12">
            Contact Us
          </h2>
          <div className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 text-center border border-primary/20 max-w-3xl mx-auto hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary to-accent rounded-3xl flex items-center justify-center shadow-xl hover:scale-110 hover:rotate-3 transition-all duration-300">
                <i className="fas fa-envelope text-white text-3xl"></i>
              </div>
              <a 
                href="mailto:elhorre.omar@etu.uae.ac.ma"
                className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent hover:from-primary hover:to-accent transition-all duration-300 hover:scale-105 inline-block"
              >
                elhorre.omar@etu.uae.ac.ma
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-8 text-text/60">
          <p>Copyright © 2025-2026</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-background relative">
          {/* Global Particle Background */}
          <ParticleBackground active={true} color="#4CAF50" />
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
              element={<MapView />}
            />
            <Route
              path="/hospital/:hospitalId"
              element={<HospitalDetail />}
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

