import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function DemandSection() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState('')
  const [size, setSize] = useState('')
  const [notes, setNotes] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const zigzagClip = `polygon(
    0% 0%, 2.5% 2.5%, 5% 0%, 7.5% 2.5%, 10% 0%, 12.5% 2.5%, 15% 0%, 17.5% 2.5%, 20% 0%, 22.5% 2.5%,
    25% 0%, 27.5% 2.5%, 30% 0%, 32.5% 2.5%, 35% 0%, 37.5% 2.5%, 40% 0%, 42.5% 2.5%, 45% 0%, 47.5% 2.5%,
    50% 0%, 52.5% 2.5%, 55% 0%, 57.5% 2.5%, 60% 0%, 62.5% 2.5%, 65% 0%, 67.5% 2.5%, 70% 0%, 72.5% 2.5%,
    75% 0%, 77.5% 2.5%, 80% 0%, 82.5% 2.5%, 85% 0%, 87.5% 2.5%, 90% 0%, 92.5% 2.5%, 95% 0%, 97.5% 2.5%, 100% 0%,
    100% 97.5%, 97.5% 100%, 95% 97.5%, 92.5% 100%, 90% 97.5%, 87.5% 100%, 85% 97.5%, 82.5% 100%, 80% 97.5%, 77.5% 100%,
    75% 97.5%, 72.5% 100%, 70% 97.5%, 67.5% 100%, 65% 97.5%, 62.5% 100%, 60% 97.5%, 57.5% 100%, 55% 97.5%, 52.5% 100%,
    50% 97.5%, 47.5% 100%, 45% 97.5%, 42.5% 100%, 40% 97.5%, 37.5% 100%, 35% 97.5%, 32.5% 100%, 30% 97.5%, 27.5% 100%,
    25% 97.5%, 22.5% 100%, 20% 97.5%, 17.5% 100%, 15% 97.5%, 12.5% 100%, 10% 97.5%, 7.5% 100%, 5% 97.5%, 2.5% 100%, 0% 97.5%
  )`

  function handleImageUpload() {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'pctbzpbb',
        uploadPreset: 'reviews_upload',
        sources: ['local', 'camera', 'url'],
        multiple: false,
        maxFiles: 1,
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImageUrl(result.info.secure_url)
          alert('Image uploaded successfully!')
        }
      }
    )
  }

  async function handleSubmit() {
    if (!name || !phone || !occasion || !size || !notes) {
      alert('Please fill all fields!')
      return
    }
    await addDoc(collection(db, 'demands'), {
      name,
      phone,
      occasion,
      size,
      notes,
      imageUrl,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString()
    })
    setSubmitted(true)
    setName('')
    setPhone('')
    setOccasion('')
    setSize('')
    setNotes('')
    setImageUrl('')
  }

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(160deg, #C8A882 0%, #A31621 20%, #6E0F17 100%)',
      padding: '100px 40px 110px',
      clipPath: zigzagClip,
      marginTop: '-1%',
      marginBottom: '-1%',
      zIndex: 2,
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)'
    }}>

      {submitted ? (
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Rye, serif', color: '#F3F1EA', fontSize: '32px', marginBottom: '16px' }}>
            Request Received! 🔥
          </h2>
          <p style={{ color: '#F3F1EA', fontSize: '16px', marginBottom: '24px', opacity: 0.9 }}>
            We'll get back to you on {phone} within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              backgroundColor: '#161412',
              color: '#F3F1EA',
              fontFamily: 'Work Sans, sans-serif',
              fontSize: '14px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px 32px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'center'
        }}>

          {/* Left — Bold Statement */}
          <div>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#161412',
              color: '#F3F1EA',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '8px 18px',
              borderRadius: '30px',
              marginBottom: '24px',
              fontFamily: 'Work Sans, sans-serif',
              fontWeight: '700',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
            }}>
              ⚡ Exclusive To Hott Stuffz
            </span>

            <h2 style={{
              fontFamily: 'Rye, serif',
              fontSize: '48px',
              lineHeight: '1.15',
              color: '#F3F1EA',
              marginBottom: '20px',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              Can't Find It?<br/>We'll Make It.
            </h2>

            <p style={{
              color: '#F3F1EA',
              fontSize: '17px',
              lineHeight: '1.7',
              opacity: 0.95,
              fontWeight: '500',
              maxWidth: '440px'
            }}>
              No other brand does this. Describe the fit you're imagining — color, style, fabric, occasion — and our team designs and arranges it just for you. This is Hott Stuffz's signature move.
            </p>
          </div>

          {/* Right — Form Card */}
          <div style={{
            backgroundColor: '#161412',
            padding: '36px',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
          }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
              />
              <input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', borderRadius: '4px' }}
              >
                <option value="">Select Occasion</option>
                <option value="Casual">Casual</option>
                <option value="Party & Night Out">Party & Night Out</option>
                <option value="Formal">Formal</option>
                <option value="Ethnic & Traditional">Ethnic & Traditional</option>
                <option value="Wedding">Wedding</option>
                <option value="Other">Other</option>
              </select>

              <input
                placeholder="Your Size (e.g. L, XL, 32)"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
              />
            </div>

            <textarea
              placeholder="Describe the outfit you want — color, style, fabric, anything you have in mind..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', height: '100px', boxSizing: 'border-box', marginBottom: '16px', borderRadius: '4px' }}
            />

            <button
              onClick={handleImageUpload}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'transparent',
                border: '1px solid #4A4540',
                color: '#F3F1EA',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '13px',
                cursor: 'pointer',
                marginBottom: '8px',
                letterSpacing: '1px',
                borderRadius: '4px'
              }}
            >
              📎 Upload Reference Image (Optional)
            </button>

            {imageUrl && (
              <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                <img
                  src={imageUrl}
                  alt="Reference"
                  style={{ width: '100px', height: '130px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #A31621' }}
                />
                <p style={{ fontSize: '12px', color: '#4A4540', marginTop: '4px' }}>✅ Image uploaded</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #D9531E 0%, #A31621 100%)',
                color: '#F3F1EA',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '15px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: '700',
                padding: '16px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '8px',
                borderRadius: '4px',
                boxShadow: '0 8px 24px rgba(163, 22, 33, 0.4)'
              }}
            >
              Send My Request 🔥
            </button>

          </div>
        </div>
      )}
    </div>
  )
}

export default DemandSection