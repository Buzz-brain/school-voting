import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOTP from './pages/VerifyOTP'
import Elections from './pages/Elections'
import VotingBooth from './pages/VotingBooth'
import CandidateNomination from './pages/CandidateNomination'
import Results from './pages/Results'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import ManageVoters from './pages/admin/ManageVoters'
import ManageCandidates from './pages/admin/ManageCandidates'
import ManageElections from './pages/admin/ManageElections'
import AdminResults from './pages/admin/Results'

function App() {
  const { authState, checkAuthStatus } = useAuth()
  
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  // Protected route components
  const ProtectedRoute = ({ children, requireAdmin }) => {
    if (!authState.isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    
    if (requireAdmin && !authState.user?.isAdmin) {
      return <Navigate to="/" replace />
    }
    
    return children
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        
        {/* Protected routes */}
        <Route path="elections" element={
          <ProtectedRoute>
            <Elections />
          </ProtectedRoute>
        } />
        <Route path="vote/:electionId" element={
          <ProtectedRoute>
            <VotingBooth />
          </ProtectedRoute>
        } />
        <Route path="nominate" element={
          <ProtectedRoute>
            <CandidateNomination />
          </ProtectedRoute>
        } />
        <Route path="results/:electionId" element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="voters" element={<ManageVoters />} />
        <Route path="candidates" element={<ManageCandidates />} />
        <Route path="elections" element={<ManageElections />} />
        <Route path="results" element={<AdminResults />} />
      </Route>
      
      {/* Catch all - 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App