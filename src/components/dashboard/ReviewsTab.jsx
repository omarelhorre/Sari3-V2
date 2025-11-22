import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import ReviewForm from './ReviewForm'
import LoadingSpinner from '../common/LoadingSpinner'
import Button from '../common/Button'

export default function ReviewsTab() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      // This would need to be updated to fetch reviews for the current hospital
      // For now, we'll just set loading to false
      setReviews([])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = () => {
    if (!user) {
      navigate('/login')
      return
    }
    setShowReviewForm(true)
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
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-secondary mb-2">Reviews</h2>
          <p className="text-text">Read and submit reviews for this hospital</p>
        </div>
        <button
          onClick={handleSubmitReview}
          className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          Submit Review
        </button>
      </div>

      {showReviewForm && (
        <ReviewForm
          onClose={() => setShowReviewForm(false)}
          onSuccess={() => {
            setShowReviewForm(false)
            fetchReviews()
          }}
        />
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-text">
            <p>No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-secondary">{review.reviewer_name}</h3>
                  <p className="text-sm text-text/70">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                {review.rating && (
                  <div className="text-primary font-semibold">
                    {review.rating}/5
                  </div>
                )}
              </div>
              <p className="text-text">{review.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

