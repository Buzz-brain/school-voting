import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaUserTie, 
  FaVoteYea, 
  FaChartPie,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const AdminSidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleToggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkClasses = 'flex items-center px-4 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors'
  const activeLinkClasses = 'flex items-center px-4 py-3 bg-primary-50 text-primary-600 rounded-md'

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt className="mr-3" /> },
    { name: 'Manage Voters', path: '/admin/voters', icon: <FaUsers className="mr-3" /> },
    { name: 'Manage Candidates', path: '/admin/candidates', icon: <FaUserTie className="mr-3" /> },
    { name: 'Manage Elections', path: '/admin/elections', icon: <FaVoteYea className="mr-3" /> },
    { name: 'Results', path: '/admin/results', icon: <FaChartPie className="mr-3" /> },
  ]

  // Mobile menu trigger
  const MobileMenuTrigger = () => (
    <div className="lg:hidden fixed bottom-4 right-4 z-50">
      <button 
        className="flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg"
        onClick={handleToggleMobile}
      >
        {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
    </div>
  )

  // Sidebar content
  const SidebarContent = () => (
    <>
      <div className="px-4 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <NavLink to="/admin" className="text-xl font-bold text-primary-600 flex items-center">
            {!isCollapsed && <span>Admin Panel</span>}
            {isCollapsed && <span>AP</span>}
          </NavLink>
          <button 
            onClick={handleToggleCollapse} 
            className="hidden lg:block text-gray-500 hover:text-primary-600"
          >
            {isCollapsed ? <FaBars size={16} /> : <FaTimes size={16} />}
          </button>
        </div>
      </div>
      
      <div className="mt-6 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => isActive ? activeLinkClasses : linkClasses}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
          
          <button
            onClick={handleLogout}
            className={linkClasses}
          >
            <FaSignOutAlt className="mr-3" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block bg-white shadow-md h-screen transition-all duration-300 overflow-y-auto ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <SidebarContent />
      </aside>
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={handleToggleMobile} />
      
      <aside className={`fixed top-0 left-0 h-screen bg-white shadow-md z-50 w-64 lg:hidden transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>
      
      <MobileMenuTrigger />
    </>
  )
}

export default AdminSidebar