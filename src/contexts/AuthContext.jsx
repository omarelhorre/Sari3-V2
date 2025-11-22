import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for admin user in localStorage first
    const adminUser = localStorage.getItem('adminUser')
    if (adminUser) {
      setUser(JSON.parse(adminUser))
      setLoading(false)
      return
    }

    // Check for mock user in localStorage
    const mockUser = localStorage.getItem('mockUser')
    if (mockUser) {
      setUser(JSON.parse(mockUser))
      setLoading(false)
    }

    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Only set if no admin or mock user was found
      if (!adminUser && !mockUser) {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Check if we have an admin or mock user first
      const currentAdminUser = localStorage.getItem('adminUser')
      const currentMockUser = localStorage.getItem('mockUser')
      if (!currentAdminUser && !currentMockUser) {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })

    // Listen for storage changes (for admin and mock user) - works across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'adminUser' || e.key === 'mockUser') {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue))
        } else {
          setUser(null)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Also check localStorage periodically for same-tab updates
    let lastAdminUser = adminUser
    let lastMockUser = mockUser
    const interval = setInterval(() => {
      const currentAdminUser = localStorage.getItem('adminUser')
      const currentMockUser = localStorage.getItem('mockUser')
      
      if (currentAdminUser !== lastAdminUser) {
        lastAdminUser = currentAdminUser
        if (currentAdminUser) {
          setUser(JSON.parse(currentAdminUser))
        } else {
          setUser(null)
        }
      } else if (currentMockUser !== lastMockUser) {
        lastMockUser = currentMockUser
        if (currentMockUser) {
          setUser(JSON.parse(currentMockUser))
        } else {
          // Only clear if it was a mock user (check current user state)
          setUser((prevUser) => {
            if (prevUser?.email?.includes('@saniatrmel.hospital') && prevUser?.id === 'a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789') {
              return null
            }
            return prevUser
          })
        }
      }
    }, 500)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const signUp = async (username, password) => {
    // Convert username to email format for Supabase (username@saniatrmel.hospital)
    const email = `${username}@saniatrmel.hospital`
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (data?.user) {
      setUser(data.user)
    }
    return { data, error }
  }

  const signIn = async (username, password) => {
    // Admin login: admin-saniat / admin123 → Saniat Rmel Hospital
    if (username === 'admin1' && password === 'admin123') {
      const adminUser = {
        id: 'admin-saniat-rmel-id',
        email: 'admin@saniatrmel.hospital',
        role: 'admin',
        hospital: 'saniat-rmel',
        hospitalName: 'Saniat Rmel Hospital',
        user_metadata: { role: 'admin', hospital: 'saniat-rmel' },
        app_metadata: { role: 'admin' },
      }
      setUser(adminUser)
      localStorage.setItem('adminUser', JSON.stringify(adminUser))
      return { data: { user: adminUser }, error: null }
    }

    // Admin login: admin-mohammed6 / admin123 → Mohammed 6 Hospital
    if (username === 'admin2' && password === 'admin123') {
      const adminUser = {
        id: 'admin-mohammed6-id',
        email: 'admin@mohammed6.hospital',
        role: 'admin',
        hospital: 'mohammed-6',
        hospitalName: 'Mohammed 6 Hospital',
        user_metadata: { role: 'admin', hospital: 'mohammed-6' },
        app_metadata: { role: 'admin' },
      }
      setUser(adminUser)
      localStorage.setItem('adminUser', JSON.stringify(adminUser))
      return { data: { user: adminUser }, error: null }
    }

    // Mock login: test / test123
    if (username === 'test' && password === 'test123') {
      const mockUser = {
        id: 'a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789', // Valid UUID v4 format
        email: 'test@saniatrmel.hospital',
        user_metadata: {},
        app_metadata: {},
      }
      setUser(mockUser)
      localStorage.setItem('mockUser', JSON.stringify(mockUser))
      return { data: { user: mockUser }, error: null }
    }

    // Convert username to email format for Supabase (username@saniatrmel.hospital)
    const email = `${username}@saniatrmel.hospital`
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (data?.user) {
      setUser(data.user)
    }
    return { data, error }
  }

  const signOut = async () => {
    // Clear admin user
    localStorage.removeItem('adminUser')
    // Clear mock user
    localStorage.removeItem('mockUser')
    setUser(null)
    
    // Sign out from Supabase if using real auth
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

