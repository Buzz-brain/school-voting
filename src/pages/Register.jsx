import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, authState } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const validateForm = () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return false
    }
    
    // Check if email is a student email (for demo purposes)
    if (!formData.email.endsWith('.edu') && !formData.email.includes('student')) {
      toast.warning('Please use your student email address')
      // Allow registration to continue in demo
    }
    
    // Password validation
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return false
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return false
    }
    
    // Student ID validation
    if (formData.studentId.length < 5) {
      toast.error('Please enter a valid student ID')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        studentId: formData.studentId,
        password: formData.password
      })
      
      if (result.success) {
        toast.success(result.message || 'Registration successful!')
        navigate('/verify-otp', { state: { email: formData.email } })
      } else {
        toast.error(result.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
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
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
          <p className="text-gray-600 mt-2">
            Register to participate in student union elections
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaUser />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Your full name"
                required
                disabled={authState.loading}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Student Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaEnvelope />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="student@university.edu"
                required
                disabled={authState.loading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be your official student email</p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
              Student ID Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaIdCard />
              </div>
              <input
                id="studentId"
                name="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Your student ID"
                required
                disabled={authState.loading}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaLock />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Create a strong password"
                required
                minLength={8}
                disabled={authState.loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Min. 8 characters</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaLock />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Confirm your password"
                required
                disabled={authState.loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
              <>
                Register <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register