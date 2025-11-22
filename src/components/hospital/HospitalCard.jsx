import { Link } from 'react-router-dom'

export default function HospitalCard({ hospital }) {
  return (
    <Link
      to={`/hospital/${hospital.id}`}
      className="group block bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-primary/20 hover:shadow-2xl hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 ease-out relative overflow-hidden"
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary to-accent rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <i className="fas fa-hospital text-white text-5xl"></i>
          </div>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-3 text-center group-hover:scale-105 transition-transform duration-300">
          {hospital.name}
        </h3>
        <p className="text-text/80 text-center mb-6 font-medium">{hospital.location}</p>
        <div className="flex items-center justify-center">
          <span className="px-6 py-3 bg-gradient-to-r from-primary/15 to-accent/15 text-primary rounded-xl font-semibold text-sm border border-primary/20 group-hover:from-primary/25 group-hover:to-accent/25 group-hover:border-primary/40 transition-all duration-300 flex items-center gap-2">
            View Details
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </span>
        </div>
      </div>
    </Link>
  )
}

