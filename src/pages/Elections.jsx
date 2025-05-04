import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaVoteYea, FaCalendar, FaMapMarkerAlt, FaInfoCircle, FaCheckCircle } from 'react-icons/fa'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Elections = () => {
  const [elections, setElections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchElections = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        setElections([
          {
            id: '1',
            title: 'Student Union President Election',
            description: 'Vote for the next Student Union President who will represent student interests for the upcoming academic year.',
            startDate: '2025-05-15T09:00:00',
            endDate: '2025-05-16T17:00:00',
            location: 'Online',
            status: 'active',
            hasVoted: false,
            positions: [
              {
                id: '1',
                title: 'President',
                candidates: 5
              }
            ]
          },
          {
            id: '2',
            title: 'Department Representatives Election',
            description: 'Select representatives for each academic department to form the student council.',
            startDate: '2025-05-20T09:00:00',
            endDate: '2025-05-22T17:00:00',
            location: 'Online',
            status: 'upcoming',
            hasVoted: false,
            positions: [
              {
                id: '1',
                title: 'Engineering Rep',
                candidates: 3
              },
              {
                id: '2',
                title: 'Business Rep',
                candidates: 4
              },
              {
                id: '3',
                title: 'Arts Rep',
                candidates: 2
              }
            ]
          },
          {
            id: '3',
            title: 'Student Budget Allocation Vote',
            description: 'Vote on the proposed budget for student activities and facilities for the next academic year.',
            startDate: '2025-04-10T09:00:00',
            endDate: '2025-04-12T17:00:00',
            location: 'Online',
            status: 'completed',
            hasVoted: true,
            positions: [
              {
                id: '1',
                title: 'Budget Approval',
                candidates: 2
              }
            ]
          }
        ])
      } catch (error) {
        console.error('Failed to fetch elections:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchElections()
  }, [])

  // Format date function
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  // Get status badge
  const renderStatusBadge = (status, hasVoted) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Upcoming
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Completed
          </span>
        )
      default:
        return null
    }
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size={50} />
      </div>
    )
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Elections</h1>
        <p className="text-gray-600">View and participate in active student union elections.</p>
      </div>
      
      {elections.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No elections available at the moment.</p>
        </div>
      ) : (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {elections.map((election) => (
            <motion.div 
              key={election.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {election.title}
                    </h2>
                    <div className="mb-4">
                      {renderStatusBadge(election.status, election.hasVoted)}
                      {election.hasVoted && (
                        <span className="inline-flex items-center ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          <FaCheckCircle className="mr-1" /> You voted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{election.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaCalendar className="mr-2 text-gray-400" />
                    <div>
                      <div className="text-sm">Starts: {formatDate(election.startDate)}</div>
                      <div className="text-sm">Ends: {formatDate(election.endDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    <span>{election.location}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">
                    Positions ({election.positions.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {election.positions.map(position => (
                      <span 
                        key={position.id} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {position.title} ({position.candidates} candidates)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                {election.status === 'active' && !election.hasVoted && (
                  <Link 
                    to={`/vote/${election.id}`} 
                    className="btn-primary inline-flex items-center"
                  >
                    <FaVoteYea className="mr-2" /> Cast Your Vote
                  </Link>
                )}
                
                {(election.status === 'upcoming' || election.hasVoted) && (
                  <Link 
                    to={`/vote/${election.id}`} 
                    className="btn-secondary inline-flex items-center"
                  >
                    <FaInfoCircle className="mr-2" /> View Details
                  </Link>
                )}
                
                {election.status === 'completed' && (
                  <Link 
                    to={`/results/${election.id}`} 
                    className="btn-secondary inline-flex items-center"
                  >
                    <FaInfoCircle className="mr-2" /> View Results
                  </Link>
                )}
                
                <div className="text-gray-500 text-sm">
                  {election.positions.reduce((total, pos) => total + pos.candidates, 0)} candidates
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Elections