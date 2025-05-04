import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaChevronLeft, FaChevronRight, FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import LoadingSpinner from '../components/common/LoadingSpinner'

const VotingBooth = () => {
  const { electionId } = useParams()
  const navigate = useNavigate()
  
  const [election, setElection] = useState(null)
  const [positions, setPositions] = useState([])
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0)
  const [selections, setSelections] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  useEffect(() => {
    const fetchElectionDetails = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock election data
        const mockElection = {
          id: electionId,
          title: 'Student Union President Election',
          description: 'Vote for the next Student Union President who will represent student interests for the upcoming academic year.',
          startDate: '2025-05-15T09:00:00',
          endDate: '2025-05-16T17:00:00',
          status: 'active'
        }
        
        // Mock positions and candidates
        const mockPositions = [
          {
            id: '1',
            title: 'President',
            description: 'The President will lead the Student Union and represent student interests to the university administration.',
            candidates: [
              {
                id: '101',
                name: 'Alex Johnson',
                bio: 'Third-year Computer Science student with a passion for student advocacy. Previous experience as Department Representative.',
                manifesto: 'My goal is to improve student facilities and create more opportunities for professional development.',
                imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                id: '102',
                name: 'Samantha Lee',
                bio: 'Fourth-year Business major with experience in student government and campus organizations.',
                manifesto: 'I will focus on increasing transparency in union operations and expanding student services.',
                imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                id: '103',
                name: 'Michael Rodriguez',
                bio: 'Graduate student in Political Science with a background in community organizing.',
                manifesto: 'My platform centers on diversity, equity, and inclusion initiatives across campus.',
                imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              }
            ]
          },
          {
            id: '2',
            title: 'Vice President',
            description: 'The Vice President assists the President and oversees internal operations of the Student Union.',
            candidates: [
              {
                id: '201',
                name: 'Emily Chen',
                bio: 'Third-year Psychology major with leadership experience in multiple student organizations.',
                manifesto: 'I aim to strengthen the connection between the student body and student union through regular town halls.',
                imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                id: '202',
                name: 'David Wilson',
                bio: 'Second-year Economics student with a background in event planning and student engagement.',
                manifesto: 'My focus will be on improving communication channels and student events coordination.',
                imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              }
            ]
          }
        ]
        
        setElection(mockElection)
        setPositions(mockPositions)
        
        // Initialize selections object
        const initialSelections = {}
        mockPositions.forEach(position => {
          initialSelections[position.id] = null
        })
        setSelections(initialSelections)
      } catch (error) {
        console.error('Failed to fetch election details:', error)
        toast.error('Failed to load election details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchElectionDetails()
  }, [electionId])
  
  const handleSelectCandidate = (candidateId) => {
    const currentPosition = positions[currentPositionIndex]
    
    setSelections(prev => ({
      ...prev,
      [currentPosition.id]: candidateId
    }))
  }
  
  const handlePrevious = () => {
    if (currentPositionIndex > 0) {
      setCurrentPositionIndex(currentPositionIndex - 1)
    }
  }
  
  const handleNext = () => {
    if (currentPositionIndex < positions.length - 1) {
      setCurrentPositionIndex(currentPositionIndex + 1)
    } else {
      // Check if all positions have selections
      const allPositionsSelected = Object.values(selections).every(selection => selection !== null)
      
      if (allPositionsSelected) {
        setShowConfirmation(true)
      } else {
        toast.warning('Please make a selection for all positions before submitting')
      }
    }
  }
  
  const handleSubmitVote = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful submission
      toast.success('Your vote has been successfully recorded!')
      navigate('/elections')
    } catch (error) {
      console.error('Failed to submit vote:', error)
      toast.error('Failed to submit your vote. Please try again.')
      setIsSubmitting(false)
      setShowConfirmation(false)
    }
  }
  
  const currentPosition = positions[currentPositionIndex] || {}
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size={50} />
      </div>
    )
  }
  
  if (!election) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Election Not Found</h2>
        <p className="text-gray-600 mb-6">The election you're looking for does not exist or has been removed.</p>
        <Link to="/elections" className="btn-primary">
          Return to Elections
        </Link>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/elections" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <FaChevronLeft className="mr-2" /> Back to Elections
      </Link>
      
      {/* Election Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{election.title}</h1>
        <p className="text-gray-600">{election.description}</p>
      </div>
      
      {/* Voting Progress */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Ballot</h2>
          <span className="text-gray-600">
            Position {currentPositionIndex + 1} of {positions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-primary-500 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentPositionIndex + 1) / positions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {positions.map((position, index) => (
            <button
              key={position.id}
              onClick={() => setCurrentPositionIndex(index)}
              className={`px-4 py-2 rounded-md text-sm ${
                index === currentPositionIndex 
                  ? 'bg-primary-500 text-white' 
                  : selections[position.id] 
                    ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {position.title}
              {selections[position.id] && <FaCheck className="inline-block ml-2" />}
            </button>
          ))}
        </div>
      </div>
      
      {/* Current Position Voting */}
      <motion.div 
        key={currentPosition.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{currentPosition.title}</h2>
          <p className="text-gray-600">{currentPosition.description}</p>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select a candidate:</h3>
          
          <div className="space-y-4">
            {currentPosition.candidates?.map(candidate => (
              <div 
                key={candidate.id} 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selections[currentPosition.id] === candidate.id 
                    ? 'border-primary-500 bg-primary-50 shadow-md' 
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
                onClick={() => handleSelectCandidate(candidate.id)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <img 
                        src={candidate.imageUrl} 
                        alt={candidate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-3/4 md:pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-900">
                        {candidate.name}
                      </h4>
                      {selections[currentPosition.id] === candidate.id && (
                        <span className="bg-primary-500 text-white p-1 rounded-full">
                          <FaCheck size={16} />
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{candidate.bio}</p>
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-1">Manifesto:</h5>
                      <p className="text-gray-600">{candidate.manifesto}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentPositionIndex === 0}
            className={`btn-secondary inline-flex items-center ${
              currentPositionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaChevronLeft className="mr-2" /> Previous
          </button>
          
          <button 
            onClick={handleNext}
            className="btn-primary inline-flex items-center"
          >
            {currentPositionIndex < positions.length - 1 ? (
              <>Next <FaChevronRight className="ml-2" /></>
            ) : (
              <>Review & Submit</>
            )}
          </button>
        </div>
      </motion.div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-lg w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Confirm Your Vote</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-600 mb-4">
                Please review your selections before final submission. Your vote cannot be changed once submitted.
              </p>
              
              {positions.map(position => {
                const selectedCandidate = position.candidates.find(
                  candidate => candidate.id === selections[position.id]
                )
                
                return (
                  <div key={position.id} className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-md font-semibold text-gray-800">{position.title}</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={selectedCandidate?.imageUrl} 
                          alt={selectedCandidate?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="ml-3 font-medium text-gray-900">
                        {selectedCandidate?.name}
                      </span>
                    </div>
                  </div>
                )
              })}
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Your vote is final once submitted and cannot be changed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-between rounded-b-lg">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Go Back
              </button>
              
              <button 
                onClick={handleSubmitVote}
                className="btn-primary flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size={20} color="#FFFFFF" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" /> Submit My Vote
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default VotingBooth