import { useState } from 'react'
import WaitingListTab from './WaitingListTab'
import BloodBankTab from './BloodBankTab'
import DoctorsTab from './DoctorsTab'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('waiting')

  const tabs = [
    { id: 'waiting', label: 'Waiting Lists', icon: '⏱️' },
    { id: 'blood', label: 'Blood Bank', icon: '🩸' },
    { id: 'doctors', label: 'Doctors', icon: '👨‍⚕️' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">Patient Dashboard</h1>
          <p className="text-text">Manage your appointments and view hospital information</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-text hover:text-primary hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'waiting' && <WaitingListTab />}
          {activeTab === 'blood' && <BloodBankTab />}
          {activeTab === 'doctors' && <DoctorsTab />}
        </div>
      </div>
    </div>
  )
}

