import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import Dashboard from '../dashboard/Dashboard'

const hospitals = {
  'saniat-rmel': {
    id: 'saniat-rmel',
    name: 'Saniat Rmel Hospital',
    location: 'Tetouan, Morocco',
    description: 'Your trusted healthcare partner in Tetouan, Morocco',
  },
  'mohammed-6': {
    id: 'mohammed-6',
    name: 'Tetouan Medical center',
    location: 'Tetouan, Morocco',
    description: 'Advanced medical care and excellence in healthcare',
  },
}

export default function HospitalDetail() {
  const { hospitalId } = useParams()
  const [hospital, setHospital] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and set hospital data
    const hospitalData = hospitals[hospitalId]
    if (hospitalData) {
      setHospital(hospitalData)
    }
    setLoading(false)
  }, [hospitalId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">Hospital Not Found</h1>
          <a href="/" className="text-primary hover:text-accent">
            Return to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <i className="fas fa-hospital text-white text-5xl"></i>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-4">
            {hospital.name}
          </h1>
          <p className="text-xl text-text mb-2">{hospital.location}</p>
          <p className="text-text">{hospital.description}</p>
        </div>
        <Dashboard />
      </div>
    </div>
  )
}

