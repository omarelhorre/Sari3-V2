import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import LoadingSpinner from '../common/LoadingSpinner'

export default function BloodBankTab() {
  const [bloodBank, setBloodBank] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBloodBank()

    // Set up real-time subscription
    const subscription = supabase
      .channel('blood_bank_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blood_bank',
        },
        () => {
          fetchBloodBank()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchBloodBank = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_bank')
        .select('*')
        .order('blood_type')

      if (error) throw error
      setBloodBank(data || [])
    } catch (error) {
      console.error('Error fetching blood bank:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (units) => {
    if (units < 5) return 'critical'
    if (units < 10) return 'low'
    return 'good'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 border-red-300 text-red-800'
      case 'low':
        return 'bg-yellow-50 border-yellow-300 text-yellow-800'
      default:
        return 'bg-green-50 border-green-300 text-green-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-secondary mb-2">Blood Bank Inventory</h2>
        <p className="text-text">Current blood type availability</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bloodBank.map((item) => {
          const status = getStockStatus(item.units)

          return (
            <div
              key={item.id}
              className={`border-2 rounded-xl p-6 text-center bg-white/20 backdrop-blur-sm ${getStatusColor(status)}`}
            >
              <div className="text-4xl font-bold mb-2">{item.blood_type}</div>
              <div className="text-2xl font-semibold mb-2">{item.units}</div>
              <div className="text-sm opacity-80">units available</div>
              {status === 'critical' && (
                <div className="mt-2 text-xs font-semibold text-red-600">
                  ⚠️ Low Stock
                </div>
              )}
              {status === 'low' && (
                <div className="mt-2 text-xs font-semibold text-yellow-600">
                  ⚠️ Running Low
                </div>
              )}
            </div>
          )
        })}
      </div>

      {bloodBank.length === 0 && (
        <div className="text-center py-12 text-text">
          <p>Blood bank data is not available at the moment.</p>
        </div>
      )}
    </div>
  )
}

