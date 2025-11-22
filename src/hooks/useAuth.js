import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for mock user in localStorage first
    const mockUser = localStorage.getItem('mockUser')
    if (mockUser) {
      setUser(JSON.parse(mockUser))
      setLoading(false)
      return
    }

    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (username, password) => {
    // Convert username to email format for Supabase (username@saniatrmel.hospital)
    const email = `${username}@saniatrmel.hospital`
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  const signIn = async (username, password) => {
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
    // Clear mock user
    localStorage.removeItem('mockUser')
    setUser(null)
    
    // Sign out from Supabase if using real auth
    await supabase.auth.signOut()
    navigate('/login')
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }
}

