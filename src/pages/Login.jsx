import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, loginAsAdmin, authState } = useAuth()
  const navigate = useNavigate()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    try {
      // Use admin login for admin@example.com, normal login for others
      let result
      
      if (email === 'admin@example.com') {
        result = await loginAsAdmin(email, password)
      } else {
        result = await login(email, password)
      }
      
      if (result.success) {
        toast.success('Login successful!')
        
        // Redirect admin users to admin dashboard, others to elections page
        if (email === 'admin@example.com') {
          navigate('/admin')
        } else {
          navigate('/elections')
        }
      } else {
        toast.error(result.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
      console.error(error)
    }
  }

  // For demo purposes, provide a way to easily log in as admin or regular user
  const handleDemoLogin = async (type) => {
    try {
      let result
      
      if (type === 'admin') {
        result = await loginAsAdmin('admin@example.com', 'password')
        if (result.success) {
          toast.success('Logged in as Admin!')
          navigate('/admin')
        }
      } else {
        result = await login('student@example.com', 'password')
        if (result.success) {
          toast.success('Logged in as Student!')
          navigate('/elections')
        }
      }
    } catch (error) {
      toast.error('Demo login failed')
      console.error(error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Login to Your Account</h1>
          <p className="text-gray-600 mt-2">
            Enter your credentials to access your account
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaUser />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="student@university.edu"
                disabled={authState.loading}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaLock />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="••••••••"
                disabled={authState.loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full flex justify-center items-center"
            disabled={authState.loading}
          >
            {authState.loading ? (
              <LoadingSpinner size={24} color="#FFFFFF" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              Register
            </Link>
          </p>
        </div>

        {/* Demo login options - for demonstration only */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center mb-4">Demo Options</p>
          <div className="flex space-x-4">
            <button
              onClick={() => handleDemoLogin('user')}
              className="btn-secondary flex-1"
              disabled={authState.loading}
            >
              Demo Student
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="btn-secondary flex-1"
              disabled={authState.loading}
            >
              Demo Admin
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login