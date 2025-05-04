import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/common/LoadingSpinner'

const MainLayout = () => {
  const { authState } = useAuth()
  
  if (authState.loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size={50} />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout