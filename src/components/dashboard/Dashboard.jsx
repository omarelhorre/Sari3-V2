import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import WaitingListTab from './WaitingListTab'
import BloodBankTab from './BloodBankTab'
import DoctorsTab from './DoctorsTab'
import ReviewsTab from './ReviewsTab'
import RequestHelpModal from './RequestHelpModal'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('waiting')
  const [showHelpModal, setShowHelpModal] = useState(false)

  const handleRequestHelpClick = () => {
    if (!user) {
      // Redirect to login with current path as redirect parameter
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)
      return
    }
    setShowHelpModal(true)
  }

  const tabs = [
    { id: 'waiting', label: 'Waiting Lists' },
    { id: 'blood', label: 'Blood Bank' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'reviews', label: 'Reviews' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-3">
                Patient Dashboard
              </h1>
              <p className="text-text/80 text-lg">Manage your appointments and view hospital information</p>
            </div>
            <button
              onClick={handleRequestHelpClick}
              className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 hover:scale-105 active:scale-95 border border-red-500/20"
            >
              <i className="fas fa-exclamation-triangle"></i>
              Request Help
            </button>
          </div>
        </div>

        <RequestHelpModal 
          isOpen={showHelpModal} 
          onClose={() => setShowHelpModal(false)} 
        />

        {/* Tab Navigation */}
        <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-2xl shadow-xl mb-6 border border-primary/20 overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-5 text-center font-semibold transition-all relative ${
                  activeTab === tab.id
                    ? 'text-primary bg-gradient-to-b from-primary/10 to-transparent'
                    : 'text-text/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-white/30 to-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-primary/10 animate-fade-in">
          {activeTab === 'waiting' && <WaitingListTab />}
          {activeTab === 'blood' && <BloodBankTab />}
          {activeTab === 'doctors' && <DoctorsTab />}
          {activeTab === 'reviews' && <ReviewsTab />}
        </div>
      </div>
    </div>
  )
}

