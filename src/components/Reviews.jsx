import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [productId])

  async function fetchReviews() {
    const q = query(collection(db, 'reviews'), where('productId', '==', productId))
    const querySnapshot = await getDocs(q)
    const reviewList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setReviews(reviewList)
  }

  function handlePhotoUpload() {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'pctbzpbb',
        uploadPreset: 'reviews_upload',
        sources: ['local', 'camera'],
        multiple: false,
        maxFiles: 1,
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setPhotoUrl(result.info.secure_url)
          alert('Photo uploaded successfully!')
        }
      }
    )
  }

  async function handleSubmit() {
    if (!name || !comment) {
      alert('Please fill your name and review!')
      return
    }
    await addDoc(collection(db, 'reviews'), {
      productId,
      name,
      rating,
      comment,
      photoUrl,
      createdAt: new Date().toLocaleDateString()
    })
    alert('Review submitted!')
    setName('')
    setRating(5)
    setComment('')
    setPhotoUrl('')
    fetchReviews()
  }

  return (
    <div style={{ marginTop: '60px' }}>

      <h2 style={{
        fontFamily: 'Rye, serif',
        fontSize: '28px',
        color: '#161412',
        marginBottom: '40px',
        textAlign: 'center',
        letterSpacing: '2px'
      }}>
        Customer Reviews
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

        {/* LEFT — Submit Review Form */}
        <div style={{ backgroundColor: '#ffffff', padding: '32px' }}>
          <h3 style={{
            fontFamily: 'Rye, serif',
            fontSize: '18px',
            marginBottom: '24px',
            color: '#161412'
          }}>
            Write a Review
          </h3>

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #4A4540',
              fontFamily: 'Work Sans, sans-serif',
              marginBottom: '16px',
              boxSizing: 'border-box'
            }}
          />

          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #4A4540',
              fontFamily: 'Work Sans, sans-serif',
              marginBottom: '16px'
            }}
          >
            <option value={5}>★★★★★ — Excellent</option>
            <option value={4}>★★★★☆ — Good</option>
            <option value={3}>★★★☆☆ — Average</option>
            <option value={2}>★★☆☆☆ — Poor</option>
            <option value={1}>★☆☆☆☆ — Terrible</option>
          </select>

          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #4A4540',
              fontFamily: 'Work Sans, sans-serif',
              height: '100px',
              boxSizing: 'border-box',
              marginBottom: '16px'
            }}
          />

          <button
            onClick={handlePhotoUpload}
            style={{
              width: '100%',
              backgroundColor: '#161412',
              color: '#F3F1EA',
              fontFamily: 'Work Sans, sans-serif',
              fontSize: '13px',
              padding: '12px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '8px',
              letterSpacing: '1px'
            }}
          >
            📷 Upload Your Photo (Optional)
          </button>

          {photoUrl && (
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
              <img
                src={photoUrl}
                alt="Preview"
                style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <p style={{ fontSize: '12px', color: '#4A4540', marginTop: '4px' }}>✅ Photo uploaded</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              backgroundColor: '#A31621',
              color: '#F3F1EA',
              fontFamily: 'Work Sans, sans-serif',
              fontSize: '14px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Submit Review
          </button>
        </div>

        {/* RIGHT — Display Reviews */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {reviews.length === 0 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              backgroundColor: '#ffffff',
              padding: '32px'
            }}>
              <p style={{ color: '#4A4540', textAlign: 'center' }}>
                No reviews yet. Be the first to review!
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                marginBottom: '16px',
                borderLeft: '3px solid #A31621'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ color: '#161412', fontWeight: '600' }}>{review.name}</h4>
                  <span style={{ color: '#4A4540', fontSize: '12px' }}>{review.createdAt}</span>
                </div>
                <p style={{ color: '#A31621', marginBottom: '8px', fontSize: '16px' }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </p>
                <p style={{ color: '#4A4540', lineHeight: '1.7', marginBottom: '12px', fontSize: '14px' }}>
                  {review.comment}
                </p>
                {review.photoUrl && (
                  <img
                    src={review.photoUrl}
                    alt={`${review.name}'s photo`}
                    style={{
                      width: '100px',
                      height: '130px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      border: '2px solid #F3F1EA'
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Reviews