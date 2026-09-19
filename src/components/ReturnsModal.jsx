import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function ReturnsModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [orderId, setOrderId] = useState('')
  const [itemName, setItemName] = useState('')
  const [requestType, setRequestType] = useState('')
  const [desiredSize, setDesiredSize] = useState('')
  const [reason, setReason] = useState('')
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
    if (!name || !phone || !orderId || !itemName || !requestType || !reason) {
      alert('Please fill all required fields!')
      return
    }
    await addDoc(collection(db, 'returns'), {
      name,
      phone,
      orderId,
      itemName,
      requestType,
      desiredSize,
      reason,
      imageUrl,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString()
    })
    setSubmitted(true)
    setName('')
    setPhone('')
    setOrderId('')
    setItemName('')
    setRequestType('')
    setDesiredSize('')
    setReason('')
    setImageUrl('')
  }

  function closeModal() {
    setIsOpen(false)
    setSubmitted(false)
  }

  return (
    <>
      <button
        className="returns-footer-btn"
        onClick={() => setIsOpen(true)}
        style={{
          background: 'linear-gradient(135deg, #D9531E 0%, #A31621 100%)',
          color: '#F3F1EA',
          fontFamily: 'Work Sans, sans-serif',
          fontSize: '13px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontWeight: '700',
          cursor: 'pointer',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '30px',
          marginTop: '16px',
          boxShadow: '0 4px 16px rgba(163, 22, 33, 0.4)',
          transition: 'transform 0.2s ease'
        }}
      >
        ↩ Returns & Exchanges
      </button>

      {isOpen && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#F3F1EA',
              borderRadius: '12px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '40px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <h1 style={{ fontFamily: 'Rye, serif', color: '#161412', fontSize: '28px' }}>
                Returns & Exchanges
              </h1>
              <button
                onClick={closeModal}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#161412' }}
              >
                ✕
              </button>
            </div>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '17px', marginBottom: '8px' }}>
                Return Window
              </h2>
              <p style={{ color: '#4A4540', fontSize: '14px', lineHeight: '1.7' }}>
                You can request a return within <strong style={{ color: '#161412' }}>7 days</strong> of delivery. Requests made after this window can't be accepted.
              </p>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '17px', marginBottom: '8px' }}>
                Conditions
              </h2>
              <ul style={{ color: '#4A4540', fontSize: '14px', lineHeight: '1.9', paddingLeft: '18px' }}>
                <li>Item must be unused, unwashed, and in original condition</li>
                <li>Tags and packaging must be intact</li>
                <li>Valid order ID required</li>
              </ul>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '17px', marginBottom: '8px' }}>
                Custom Orders
              </h2>
              <p style={{ color: '#4A4540', fontSize: '14px', lineHeight: '1.7' }}>
                Made-to-order outfits from our "Can't Find It? We'll Make It" service can't be returned or exchanged unless damaged or significantly different from what was agreed.
              </p>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '17px', marginBottom: '8px' }}>
                Refunds & Exchanges
              </h2>
              <p style={{ color: '#4A4540', fontSize: '14px', lineHeight: '1.7' }}>
                Approved returns are refunded as <strong style={{ color: '#161412' }}>store credit</strong>, issued within 5-7 business days. Need a different size or color instead? Choose "Exchange" below.
              </p>
            </section>

            {/* Form */}
            <div style={{
              backgroundColor: '#161412',
              padding: '28px',
              borderRadius: '12px'
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontFamily: 'Rye, serif', color: '#F3F1EA', fontSize: '20px', marginBottom: '10px' }}>
                    Request Received! 🔥
                  </h2>
                  <p style={{ color: '#F3F1EA', fontSize: '14px', opacity: 0.9, marginBottom: '16px' }}>
                    We'll get back to you on {phone} within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      backgroundColor: '#A31621',
                      color: '#F3F1EA',
                      padding: '10px 24px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '13px'
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: 'Rye, serif', color: '#F3F1EA', fontSize: '18px', marginBottom: '18px' }}>
                    Start a Return or Exchange
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <input
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ padding: '10px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
                    />
                    <input
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ padding: '10px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <input
                      placeholder="Order ID"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      style={{ padding: '10px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
                    />
                    <input
                      placeholder="Item Name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      style={{ padding: '10px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <select
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value)}
                      style={{ padding: '10px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', borderRadius: '4px' }}
                    >
                      <option value="">Request Type</option>
                      <option value="Return">Return</option>
                      <option value="Exchange">Exchange</option>
                    </select>
                    <input
                      placeholder="Desired Size (if exchange)"
                      value={desiredSize}
                      onChange={(e) => setDesiredSize(e.target.value)}
                      style={{ padding: '10px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
                    />
                  </div>

                  <textarea
                    placeholder="Reason for return/exchange"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{ width: '100%', padding: '10px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', height: '80px', boxSizing: 'border-box', marginBottom: '12px', borderRadius: '4px' }}
                  />

                  <button
                    onClick={handleImageUpload}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: 'transparent',
                      border: '1px solid #4A4540',
                      color: '#F3F1EA',
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '13px',
                      cursor: 'pointer',
                      marginBottom: '8px',
                      borderRadius: '4px'
                    }}
                  >
                    📎 Upload Photo (Optional)
                  </button>

                  {imageUrl && (
                    <div style={{ marginBottom: '12px', textAlign: 'center' }}>
                      <img
                        src={imageUrl}
                        alt="Return reference"
                        style={{ width: '90px', height: '110px', objectFit: 'cover', borderRadius: '4px', border: '2px solid #A31621' }}
                      />
                      <p style={{ fontSize: '12px', color: '#4A4540', marginTop: '4px' }}>✅ Photo uploaded</p>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #D9531E 0%, #A31621 100%)',
                      color: '#F3F1EA',
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '14px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontWeight: '700',
                      padding: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    Submit Request
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default ReturnsModal