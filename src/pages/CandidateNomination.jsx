import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaChevronLeft, FaUser, FaFileAlt, FaCamera, FaCheck, FaInfoCircle } from 'react-icons/fa'
import LoadingSpinner from '../components/common/LoadingSpinner'

const CandidateNomination = () => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    position: '',
    manifesto: '',
    bio: '',
    experience: '',
    goals: ''
  })
  
  const [photoPreview, setPhotoPreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [termsAccepted, setTermsAccepted] = useState(false)
  
  // Mock positions
  const availablePositions = [
    { id: '1', title: 'President' },
    { id: '2', title: 'Vice President' },
    { id: '3', title: 'Treasurer' },
    { id: '4', title: 'Secretary' },
    { id: '5', title: 'Events Coordinator' }
  ]
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      // Check file type
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file')
        return
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.position) {
        toast.error('Please select a position')
        return
      }
    } else if (currentStep === 2) {
      if (!formData.bio || !formData.experience) {
        toast.error('Please complete your profile information')
        return
      }
    } else if (currentStep === 3) {
      if (!formData.manifesto || !formData.goals) {
        toast.error('Please provide your manifesto and goals')
        return
      }
    }
    
    setCurrentStep(prev => prev + 1)
  }
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful submission
      toast.success('Your nomination has been submitted for review!')
      navigate('/elections')
    } catch (error) {
      console.error('Failed to submit nomination:', error)
      toast.error('Failed to submit your nomination. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Progress bar percentage
  const progressPercentage = (currentStep / 4) * 100
  
  // Step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select a Position</h2>
            <p className="text-gray-600 mb-6">
              Choose the position you would like to run for in the upcoming student union election.
            </p>
            
            <div className="mb-6">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Position *
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a position</option>
                {availablePositions.map(position => (
                  <option key={position.id} value={position.id}>
                    {position.title}
                  </option>
                ))}
              </select>
            </div>
            
            {formData.position && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaInfoCircle className="text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Running for {
                        availablePositions.find(p => p.id === formData.position)?.title
                      } requires a commitment to attend weekly meetings and represent student interests.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
            <p className="text-gray-600 mb-6">
              Tell us about yourself and your qualifications for this position.
            </p>
            
            <div className="mb-6">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <div className="flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-300">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-gray-400 text-3xl" />
                  )}
                </div>
                <div className="ml-5">
                  <label className="btn-secondary cursor-pointer">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                    <FaCamera className="mr-2 inline-block" />
                    Upload Photo
                  </label>
                  <p className="text-xs text-gray-500 mt-1">JPG or PNG. Max 5MB.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Short Bio *
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="input-field h-24"
                placeholder="Tell voters about yourself (max 200 words)"
                required
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                {formData.bio.split(' ').filter(Boolean).length} / 200 words
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Relevant Experience *
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="input-field h-24"
                placeholder="Describe your relevant leadership experience"
                required
              ></textarea>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Platform</h2>
            <p className="text-gray-600 mb-6">
              Share your vision and goals for this position.
            </p>
            
            <div className="mb-6">
              <label htmlFor="manifesto" className="block text-sm font-medium text-gray-700 mb-1">
                Manifesto *
              </label>
              <textarea
                id="manifesto"
                name="manifesto"
                value={formData.manifesto}
                onChange={handleChange}
                className="input-field h-32"
                placeholder="Outline your key platform and vision for this position"
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                Key Goals *
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                className="input-field h-32"
                placeholder="List your main goals if elected (be specific)"
                required
              ></textarea>
            </div>
          </div>
        )
      
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review & Submit</h2>
            <p className="text-gray-600 mb-6">
              Please review your nomination before submitting.
            </p>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Position</h3>
                <p className="text-gray-700">
                  {availablePositions.find(p => p.id === formData.position)?.title || 'Not selected'}
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Personal Information</h3>
                <div className="flex items-start">
                  {photoPreview && (
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img 
                        src={photoPreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Bio:</h4>
                    <p className="text-gray-600 text-sm mb-2">{formData.bio || 'Not provided'}</p>
                    
                    <h4 className="text-sm font-medium text-gray-700">Experience:</h4>
                    <p className="text-gray-600 text-sm">{formData.experience || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Platform</h3>
                <h4 className="text-sm font-medium text-gray-700">Manifesto:</h4>
                <p className="text-gray-600 text-sm mb-2">{formData.manifesto || 'Not provided'}</p>
                
                <h4 className="text-sm font-medium text-gray-700">Goals:</h4>
                <p className="text-gray-600 text-sm">{formData.goals || 'Not provided'}</p>
              </div>
              
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-700">
                      I confirm that all information provided is accurate and I agree to abide by the election rules and code of conduct. *
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/elections" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <FaChevronLeft className="mr-2" /> Back to Elections
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Candidate Nomination</h1>
          <p className="text-gray-600 mt-1">
            Submit your nomination to run for a position in the student union election.
          </p>
          
          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Position</span>
              <span>Profile</span>
              <span>Platform</span>
              <span>Submit</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              {[1, 2, 3, 4].map(step => (
                <div 
                  key={step}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep >= step 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step ? <FaCheck /> : step}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex justify-between">
            {currentStep > 1 && (
              <button 
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button 
                type="button"
                onClick={handleNextStep}
                className="btn-primary"
              >
                Next
              </button>
            ) : (
              <button 
                type="submit"
                className="btn-primary flex items-center"
                disabled={isSubmitting || !termsAccepted}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size={20} color="#FFFFFF" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  <>
                    <FaFileAlt className="mr-2" /> Submit Nomination
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CandidateNomination