import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaTrophy, FaExclamationTriangle } from 'react-icons/fa'
import LoadingSpinner from '../components/common/LoadingSpinner'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const Results = () => {
  const { electionId } = useParams()
  
  const [election, setElection] = useState(null)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activePosition, setActivePosition] = useState(null)
  const [chartType, setChartType] = useState('bar')
  
  useEffect(() => {
    const fetchElectionResults = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock election data
        const mockElection = {
          id: electionId,
          title: 'Student Union President Election',
          description: 'Results of the presidential election for the 2025-2026 academic year.',
          startDate: '2025-05-15T09:00:00',
          endDate: '2025-05-16T17:00:00',
          totalVoters: 1253,
          totalVotesCast: 876,
          status: 'completed'
        }
        
        // Mock results data
        const mockResults = [
          {
            positionId: '1',
            positionTitle: 'President',
            candidates: [
              { id: '101', name: 'Alex Johnson', votes: 342, percentage: 39.0 },
              { id: '102', name: 'Samantha Lee', votes: 289, percentage: 33.0 },
              { id: '103', name: 'Michael Rodriguez', votes: 245, percentage: 28.0 }
            ],
            winner: '101'
          },
          {
            positionId: '2',
            positionTitle: 'Vice President',
            candidates: [
              { id: '201', name: 'Emily Chen', votes: 463, percentage: 52.9 },
              { id: '202', name: 'David Wilson', votes: 413, percentage: 47.1 }
            ],
            winner: '201'
          }
        ]
        
        setElection(mockElection)
        setResults(mockResults)
        setActivePosition(mockResults[0].positionId)
      } catch (error) {
        console.error('Failed to fetch election results:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchElectionResults()
  }, [electionId])
  
  // Get active position results
  const activePositionResults = results.find(position => position.positionId === activePosition)
  
  // Prepare chart data
  const prepareChartData = () => {
    if (!activePositionResults) return null
    
    const labels = activePositionResults.candidates.map(candidate => candidate.name)
    const data = activePositionResults.candidates.map(candidate => candidate.votes)
    
    // Generate colors with winner highlighted
    const backgroundColor = activePositionResults.candidates.map(candidate => 
      candidate.id === activePositionResults.winner ? 
        'rgba(0, 102, 204, 0.8)' : 
        'rgba(154, 180, 231, 0.6)'
    )
    
    const borderColor = activePositionResults.candidates.map(candidate => 
      candidate.id === activePositionResults.winner ? 
        'rgb(0, 102, 204)' : 
        'rgb(154, 180, 231)'
    )
    
    return {
      labels,
      datasets: [
        {
          label: 'Votes',
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1
        }
      ]
    }
  }
  
  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: activePositionResults?.positionTitle || 'Election Results',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const votes = context.raw
            const percentage = activePositionResults?.candidates[context.dataIndex].percentage
            return `Votes: ${votes} (${percentage}%)`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Votes'
        }
      }
    }
  }
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: activePositionResults?.positionTitle || 'Election Results',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const votes = context.raw
            const percentage = activePositionResults?.candidates[context.dataIndex].percentage
            return `Votes: ${votes} (${percentage}%)`
          }
        }
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
  
  if (!election) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Results Not Found</h2>
        <p className="text-gray-600 mb-6">The election results you're looking for do not exist or have not been released yet.</p>
        <Link to="/elections" className="btn-primary">
          Return to Elections
        </Link>
      </div>
    )
  }
  
  const chartData = prepareChartData()
  
  return (
    <div>
      <Link to="/elections" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <FaChevronLeft className="mr-2" /> Back to Elections
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{election.title}</h1>
        <p className="text-gray-600">{election.description}</p>
      </div>
      
      {/* Election statistics */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Election Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-500 text-sm mb-1">Total Eligible Voters</p>
            <p className="text-2xl font-bold text-gray-900">{election.totalVoters}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-500 text-sm mb-1">Total Votes Cast</p>
            <p className="text-2xl font-bold text-gray-900">{election.totalVotesCast}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-500 text-sm mb-1">Voter Turnout</p>
            <p className="text-2xl font-bold text-gray-900">
              {((election.totalVotesCast / election.totalVoters) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      
      {/* Results section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Election Results</h2>
            
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setChartType('bar')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  chartType === 'bar' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Bar Chart
              </button>
              <button
                type="button"
                onClick={() => setChartType('pie')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  chartType === 'pie' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Pie Chart
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Positions sidebar */}
          <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Positions
              </h3>
              <div className="space-y-1">
                {results.map(position => (
                  <button
                    key={position.positionId}
                    onClick={() => setActivePosition(position.positionId)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      activePosition === position.positionId
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {position.positionTitle}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Results content */}
          <div className="w-full md:w-3/4 p-6">
            {activePositionResults ? (
              <motion.div
                key={activePosition}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="h-64 md:h-80">
                    {chartData && (
                      chartType === 'bar' ? (
                        <Bar data={chartData} options={barOptions} />
                      ) : (
                        <Pie data={chartData} options={pieOptions} />
                      )
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Detailed Results for {activePositionResults.positionTitle}
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rank
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Votes
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Percentage
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Result
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {activePositionResults.candidates
                          .sort((a, b) => b.votes - a.votes)
                          .map((candidate, index) => (
                            <tr key={candidate.id} className={candidate.id === activePositionResults.winner ? 'bg-primary-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {candidate.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {candidate.votes}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {candidate.percentage}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {candidate.id === activePositionResults.winner ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <FaTrophy className="mr-1" /> Winner
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-500">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Select a position to view results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results