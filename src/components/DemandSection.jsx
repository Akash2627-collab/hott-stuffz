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

  if (submitted) {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '28px', marginBottom: '16px' }}>
          Request Received! 🔥
        </h2>
        <p style={{ color: '#4A4540', fontSize: '16px', marginBottom: '24px' }}>
          We'll get back to you on {phone} within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            backgroundColor: '#A31621',
            color: '#F3F1EA',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '14px 32px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '80px 40px', backgroundColor: '#474644' }}>

      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', fontSize: '32px', color: '#F3F1EA', marginBottom: '12px' }}>
          Can't Find What You Want?
        </h2>
        <p style={{ color: '#4A4540', fontSize: '15px' }}>
          Tell us what you're looking for — we'll arrange it for you.
        </p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box' }}
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA' }}
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
            style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box' }}
          />
        </div>

        <textarea
          placeholder="Describe the outfit you want — color, style, fabric, anything you have in mind..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', height: '120px', boxSizing: 'border-box', marginBottom: '16px' }}
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
            letterSpacing: '1px'
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
            backgroundColor: '#A31621',
            color: '#F3F1EA',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '16px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Send My Request 🔥
        </button>

      </div>
    </div>
  )
}

export default DemandSection