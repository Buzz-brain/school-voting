import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { FaEnvelope, FaRedo } from 'react-icons/fa'

const VerifyOTP = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { verifyOTP, authState } = useAuth()
  
  // Get email from location state or use empty string
  const email = location.state?.email || ''
  
  // If no email is provided, redirect to register
  useEffect(() => {
    if (!email) {
      toast.error('Email address is missing. Please register first.')
      navigate('/register')
    }
  }, [email, navigate])
  
  // Create an array of 6 empty strings for OTP digits
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(30)
  const inputRefs = useRef([])
  
  // Set up the countdown timer
  useEffect(() => {
    let interval = null
    
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timer])
  
  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    // Only allow digits and ensure only one character
    if (/^\d?$/.test(value)) {
      const newOtpDigits = [...otpDigits]
      newOtpDigits[index] = value
      setOtpDigits(newOtpDigits)
      
      // Auto-focus next input if value is entered
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1].focus()
      }
    }
  }
  
  // Handle keydown events for backspace
  const handleKeyDown = (index, e) => {
    // If backspace is pressed and current field is empty, focus previous field
    if (e.key === 'Backspace' && otpDigits[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }
  
  // Focus first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const otpCode = otpDigits.join('')
    
    if (otpCode.length !== 6) {
      toast.error('Please enter all 6 digits of the OTP')
      return
    }
    
    try {
      const result = await verifyOTP(email, otpCode)
      
      if (result.success) {
        toast.success('Email verified successfully!')
        navigate('/elections')
      } else {
        toast.error(result.error || 'Invalid OTP. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error(error)
    }
  }
  
  // Handle OTP resend
  const handleResendOTP = async () => {
    if (timer > 0) return
    
    setIsResending(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setTimer(30)
      toast.success('A new OTP has been sent to your email')
      
      // Reset OTP fields
      setOtpDigits(['', '', '', '', '', ''])
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  // Demo helper - auto-fill with correct OTP
  const handleDemoAutoFill = () => {
    setOtpDigits(['1', '2', '3', '4', '5', '6'])
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
            <FaEnvelope size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600 mt-2">
            We've sent a 6-digit verification code to<br />
            <span className="font-medium">{email}</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter Verification Code
            </label>
            <div className="flex justify-between gap-2">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                  maxLength={1}
                  disabled={authState.loading}
                  autoComplete="off"
                />
              ))}
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
              'Verify Email'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendOTP}
            disabled={timer > 0 || isResending}
            className="flex items-center justify-center mx-auto text-primary-600 hover:text-primary-700 disabled:text-gray-400"
          >
            <FaRedo className="mr-2" />
            {isResending ? (
              <LoadingSpinner size={16} color="currentColor" />
            ) : timer > 0 ? (
              `Resend code in ${timer}s`
            ) : (
              'Resend Code'
            )}
          </button>
        </div>
        
        {/* For demo purposes only */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center mb-4">Demo Option</p>
          <button
            onClick={handleDemoAutoFill}
            className="btn-secondary w-full"
            disabled={authState.loading}
          >
            Auto-fill Demo OTP (123456)
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default VerifyOTP