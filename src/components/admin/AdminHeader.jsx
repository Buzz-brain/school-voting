import { useAuth } from '../../context/AuthContext'
import { FaBell, FaUser } from 'react-icons/fa'
import { useState } from 'react'

const AdminHeader = () => {
  const { authState } = useAuth()
  const [showProfile, setShowProfile] = useState(false)
  
  const toggleProfile = () => {
    setShowProfile(!showProfile)
  }

  return (
    <header className="bg-white shadow-sm py-3 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-1 text-gray-500 hover:text-primary-600 focus:outline-none">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-error-500 rounded-full"></span>
            </button>
          </div>
          
          {/* User profile */}
          <div className="relative">
            <button 
              onClick={toggleProfile}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <div className="bg-gray-200 p-2 rounded-full">
                <FaUser className="w-4 h-4" />
              </div>
              <span className="hidden md:block font-medium">{authState.user?.name || 'Admin'}</span>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm leading-5 font-medium text-gray-900">{authState.user?.name || 'Admin'}</p>
                  <p className="text-xs leading-4 font-medium text-gray-500 truncate">{authState.user?.email || 'admin@example.com'}</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader