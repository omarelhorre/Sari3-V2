import { Link } from 'react-router-dom'

export default function HospitalCard({ hospital }) {
  return (
    <Link
      to={`/hospital/${hospital.id}`}
      className="group block bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary/10 hover:shadow-2xl hover:scale-105 transition-all"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <span className="text-white text-4xl">🏥</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3 text-center group-hover:text-primary transition-colors">
        {hospital.name}
      </h3>
      <p className="text-text text-center mb-4">{hospital.location}</p>
      <div className="flex items-center justify-center">
        <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold text-sm">
          View Details →
        </span>
      </div>
    </Link>
  )
}

