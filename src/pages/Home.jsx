import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaVoteYea, FaLock, FaChartBar, FaMobileAlt } from 'react-icons/fa'

const Home = () => {
  const features = [
    {
      icon: <FaVoteYea size={24} />,
      title: 'Secure Voting',
      description: 'Our platform ensures that every vote is securely recorded and protected from tampering.'
    },
    {
      icon: <FaLock size={24} />,
      title: 'OTP Verification',
      description: 'Two-factor authentication through email ensures only eligible students can cast votes.'
    },
    {
      icon: <FaChartBar size={24} />,
      title: 'Real-time Results',
      description: 'Watch election results update in real-time as votes are cast and counted.'
    },
    {
      icon: <FaMobileAlt size={24} />,
      title: 'Mobile Friendly',
      description: 'Vote from anywhere on any device with our responsive, mobile-first design.'
    }
  ]

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

  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="text-center md:text-left py-10 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Modern, Secure <span className="text-primary-500">Student Elections</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transforming student union elections with secure, accessible voting that students can trust. Vote anytime, anywhere, with confidence.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/register" className="btn-primary text-center px-8 py-3">
                Register to Vote
              </Link>
              <Link to="/login" className="btn-secondary text-center px-8 py-3">
                Login
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <img 
              src="https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Students voting" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Platform</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our digital voting platform combines security, accessibility, and transparency for student unions worldwide.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our voting process is simple, secure, and designed for the modern student.
            </p>
          </div>
          
          <div className="relative">
            {/* Progress line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-100 -translate-x-1/2"></div>
            
            <motion.div 
              className="space-y-12 md:space-y-0 relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Step 1 */}
              <motion.div 
                className="md:flex items-center justify-between"
                variants={itemVariants}
              >
                <div className="md:w-5/12">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Student registration" 
                      className="w-full h-auto" 
                    />
                  </div>
                </div>
                <div className="md:w-2/12 flex justify-center py-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold relative z-10">
                    1
                  </div>
                </div>
                <div className="md:w-5/12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Register & Verify</h3>
                  <p className="text-gray-600">
                    Create an account with your student email and verify your identity with a one-time password sent to your email.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                className="md:flex items-center justify-between md:flex-row-reverse"
                variants={itemVariants}
              >
                <div className="md:w-5/12">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Browsing candidates" 
                      className="w-full h-auto" 
                    />
                  </div>
                </div>
                <div className="md:w-2/12 flex justify-center py-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold relative z-10">
                    2
                  </div>
                </div>
                <div className="md:w-5/12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Browse Candidates</h3>
                  <p className="text-gray-600">
                    Explore each candidate's profile and manifesto to make an informed decision before casting your vote.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                className="md:flex items-center justify-between"
                variants={itemVariants}
              >
                <div className="md:w-5/12">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.pexels.com/photos/6953506/pexels-photo-6953506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Voting" 
                      className="w-full h-auto" 
                    />
                  </div>
                </div>
                <div className="md:w-2/12 flex justify-center py-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold relative z-10">
                    3
                  </div>
                </div>
                <div className="md:w-5/12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Vote Securely</h3>
                  <p className="text-gray-600">
                    Cast your vote securely from any device. Your vote is encrypted and your identity remains confidential.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div 
                className="md:flex items-center justify-between md:flex-row-reverse"
                variants={itemVariants}
              >
                <div className="md:w-5/12">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Viewing results" 
                      className="w-full h-auto" 
                    />
                  </div>
                </div>
                <div className="md:w-2/12 flex justify-center py-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold relative z-10">
                    4
                  </div>
                </div>
                <div className="md:w-5/12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">View Results</h3>
                  <p className="text-gray-600">
                    Watch the results update in real-time once the polls close. Transparent and accurate counting is guaranteed.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your student elections?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of students who trust our platform for fair and secure elections.
          </p>
          <Link to="/register" className="inline-block bg-white text-primary-600 font-medium py-3 px-8 rounded-md shadow-md hover:bg-gray-100 transition-colors">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home