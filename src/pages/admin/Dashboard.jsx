import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUsers, FaVoteYea, FaUserTie, FaCalendarAlt, FaCheckCircle, FaChartBar } from 'react-icons/fa'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { Bar } from 'react-chartjs-2'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        setStats({
          activeElections: 2,
          totalVoters: 1253,
          registeredCandidates: 28,
          votesSubmitted: 876,
          pendingApprovals: 14,
          voterTurnout: 69.9
        })
        
        setRecentActivity([
          {
            id: 1, 
            type: 'voter_registration', 
            message: 'New voter registration: Emma Wilson', 
            timestamp: '2025-05-10T14:23:00'
          },
          {
            id: 2, 
            type: 'candidate_nomination', 
            message: 'New candidate nomination: Jake Thompson for Treasurer', 
            timestamp: '2025-05-10T13:45:00'
          },
          {
            id: 3, 
            type: 'vote_cast', 
            message: 'New vote cast in Student Union President Election', 
            timestamp: '2025-05-10T12:37:00'
          },
          {
            id: 4, 
            type: 'voter_registration', 
            message: 'New voter registration: Carlos Mendez', 
            timestamp: '2025-05-10T11:52:00'
          },
          {
            id: 5, 
            type: 'candidate_nomination', 
            message: 'New candidate nomination: Sarah Kim for Events Coordinator', 
            timestamp: '2025-05-10T10:18:00'
          },
          {
            id: 6, 
            type: 'vote_cast', 
            message: 'New vote cast in Department Representatives Election', 
            timestamp: '2025-05-10T09:45:00'
          }
        ])
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])
  
  // Chart data
  const dailyVotesData = {
    labels: ['May 4', 'May 5', 'May 6', 'May 7', 'May 8', 'May 9', 'May 10'],
    datasets: [
      {
        label: 'Votes Cast',
        data: [65, 102, 98, 124, 182, 143, 162],
        backgroundColor: 'rgba(0, 102, 204, 0.6)',
        borderColor: 'rgb(0, 102, 204)',
        borderWidth: 1
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Votes Per Day (Last 7 Days)',
        font: {
          size: 16
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
  
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'voter_registration':
        return <FaUsers className="text-blue-500" />
      case 'candidate_nomination':
        return <FaUserTie className="text-purple-500" />
      case 'vote_cast':
        return <FaVoteYea className="text-green-500" />
      default:
        return <FaCheckCircle className="text-gray-500" />
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
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of the election system's current status</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full">
              <FaVoteYea className="text-primary-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Elections</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeElections}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/elections" className="text-sm text-primary-600 hover:text-primary-700">
              View details →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUsers className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Voters</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalVoters}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/voters" className="text-sm text-primary-600 hover:text-primary-700">
              View details →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaUserTie className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Registered Candidates</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.registeredCandidates}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/candidates" className="text-sm text-primary-600 hover:text-primary-700">
              View details →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaVoteYea className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Votes Submitted</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.votesSubmitted}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/results" className="text-sm text-primary-600 hover:text-primary-700">
              View results →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaCheckCircle className="text-yellow-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingApprovals}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/candidates" className="text-sm text-primary-600 hover:text-primary-700">
              Review now →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <FaChartBar className="text-red-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Voter Turnout</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.voterTurnout}%</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/results" className="text-sm text-primary-600 hover:text-primary-700">
              View analytics →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Voting Activity</h2>
          <div className="h-72">
            <Bar data={dailyVotesData} options={chartOptions} />
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </button>
          </div>
          
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map(activity => (
                <li key={activity.id} className="py-3">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Upcoming Elections */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Elections</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Election Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Positions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary-500" />
                    <div className="text-sm font-medium text-gray-900">
                      Student Union President Election
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  May 15, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  May 16, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary-500" />
                    <div className="text-sm font-medium text-gray-900">
                      Department Representatives Election
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Upcoming
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  May 20, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  May 22, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary-500" />
                    <div className="text-sm font-medium text-gray-900">
                      Student Council Treasurer Election
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Scheduled
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  June 5, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  June 7, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard