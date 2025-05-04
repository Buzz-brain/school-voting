import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-primary-600">Student Vote</span>
            </Link>
            <p className="text-gray-600 max-w-md">
              A secure online voting platform for student union elections, 
              designed to facilitate democratic decision-making in educational institutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Features</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Secure Voting
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                    OTP Verification
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                    Real-time Results
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-center text-sm">
            &copy; {currentYear} Student Vote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer