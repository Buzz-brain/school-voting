import { createContext, useContext, useState, useCallback } from 'react'

// Create auth context
const AuthContext = createContext()

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // State to track authentication status and user information
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
  })

  // Function to check authentication status (would connect to backend in production)
  const checkAuthStatus = useCallback(() => {
    // Simulate checking for auth token in localStorage
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null
        })
      } catch (error) {
        // If there's an error parsing the user data, clear local storage
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Session expired. Please login again.'
        })
      }
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      })
    }
  }, [])

  // Mock login function (would connect to backend in production)
  const login = useCallback(async (email, password) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would be a response from your backend
      // Simulate successful login with non-admin user
      const mockUser = { id: '123', email, name: 'Test User', isAdmin: false }
      
      // Store token and user data
      localStorage.setItem('authToken', 'mock-jwt-token')
      localStorage.setItem('userData', JSON.stringify(mockUser))
      
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
        error: null
      })
      
      return { success: true }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Login failed. Please try again.'
      }))
      return { success: false, error: error.message }
    }
  }, [])

  // Mock admin login (for demonstration)
  const loginAsAdmin = useCallback(async (email, password) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate successful admin login
      const mockAdminUser = { id: 'admin123', email, name: 'Admin User', isAdmin: true }
      
      localStorage.setItem('authToken', 'mock-admin-jwt-token')
      localStorage.setItem('userData', JSON.stringify(mockAdminUser))
      
      setAuthState({
        isAuthenticated: true,
        user: mockAdminUser,
        loading: false,
        error: null
      })
      
      return { success: true }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Login failed. Please try again.'
      }))
      return { success: false, error: error.message }
    }
  }, [])

  // Register function
  const register = useCallback(async (userData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would create a user in your database
      // For now, just return success without actually creating a user
      
      setAuthState(prev => ({
        ...prev,
        loading: false
      }))
      
      return { 
        success: true, 
        message: 'Registration successful! Please check your email for OTP verification.'
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Registration failed. Please try again.'
      }))
      return { success: false, error: error.message }
    }
  }, [])

  // Verify OTP function
  const verifyOTP = useCallback(async (email, otp) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate OTP verification (in a real app, this would validate against a backend)
      // Using a fixed OTP for demo purposes
      if (otp === '123456') {
        const mockUser = { id: 'new123', email, name: 'New User', isAdmin: false }
        
        localStorage.setItem('authToken', 'mock-jwt-token-after-otp')
        localStorage.setItem('userData', JSON.stringify(mockUser))
        
        setAuthState({
          isAuthenticated: true,
          user: mockUser,
          loading: false,
          error: null
        })
        
        return { success: true }
      } else {
        throw new Error('Invalid OTP code')
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'OTP verification failed. Please try again.'
      }))
      return { success: false, error: error.message }
    }
  }, [])

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    })
  }, [])

  const value = {
    authState,
    login,
    loginAsAdmin,
    register,
    verifyOTP,
    logout,
    checkAuthStatus
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}