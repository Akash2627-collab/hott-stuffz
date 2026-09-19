import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Returns() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [orderId, setOrderId] = useState('')
  const [itemName, setItemName] = useState('')
  const [requestType, setRequestType] = useState('')
  const [desiredSize, setDesiredSize] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)

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
  }

  return (
    <div style={{ padding: '80px 40px', maxWidth: '900px', margin: '0 auto' }}>

      <h1 style={{ fontFamily: 'Rye, serif', color: '#161412', fontSize: '36px', marginBottom: '12px' }}>
        Returns & Exchanges
      </h1>
      <p style={{ color: '#4A4540', fontSize: '15px', marginBottom: '48px' }}>
        We want you to love what you ordered. Here's how returns and exchanges work at Hott Stuffz.
      </p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '20px', marginBottom: '12px' }}>
          Return Window
        </h2>
        <p style={{ color: '#4A4540', fontSize: '15px', lineHeight: '1.8' }}>
          You can request a return within <strong style={{ color: '#161412' }}>7 days</strong> of the delivery date. Requests made after this window unfortunately cannot be accepted.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '20px', marginBottom: '12px' }}>
          Return Conditions
        </h2>
        <ul style={{ color: '#4A4540', fontSize: '15px', lineHeight: '2', paddingLeft: '20px' }}>
          <li>Item must be unused, unwashed, and in its original condition</li>
          <li>All original tags and packaging must be intact</li>
          <li>Item must not show signs of wear, damage, or alteration</li>
          <li>A valid order ID or proof of purchase is required</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '20px', marginBottom: '12px' }}>
          Non-Returnable Items
        </h2>
        <p style={{ color: '#4A4540', fontSize: '15px', lineHeight: '1.8' }}>
          Custom or made-to-order outfits requested through our "Can't Find It? We'll Make It" service are made specifically for you and cannot be returned or exchanged unless the item arrives damaged or significantly different from what was agreed upon.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '20px', marginBottom: '12px' }}>
          Refunds — Store Credit
        </h2>
        <p style={{ color: '#4A4540', fontSize: '15px', lineHeight: '1.8' }}>
          Approved returns are refunded as <strong style={{ color: '#161412' }}>store credit</strong>, which you can use on any future purchase at Hott Stuffz. Credit is usually issued within 5-7 business days of us receiving and inspecting the returned item.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '20px', marginBottom: '12px' }}>
          Return Shipping
        </h2>
        <p style={{ color: '#4A4540', fontSize: '15px', lineHeight: '1.8' }}>
          Customers are responsible for return shipping costs unless the item was received damaged, defective, or incorrect — in which case we'll cover the cost.
        </p>
      </section>

      {/* Request Form */}
      <section style={{
        backgroundColor: '#161412',
        padding: '36px',
        borderRadius: '16px',
        marginTop: '48px'
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Rye, serif', color: '#F3F1EA', fontSize: '24px', marginBottom: '12px' }}>
              Request Received! 🔥
            </h2>
            <p style={{ color: '#F3F1EA', fontSize: '15px', opacity: 0.9, marginBottom: '20px' }}>
              We'll get back to you on {phone} within 24-48 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                backgroundColor: '#A31621',
                color: '#F3F1EA',
                padding: '12px 28px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '13px',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: 'Rye, serif', color: '#F3F1EA', fontSize: '22px', marginBottom: '24px' }}>
              Start a Return or Exchange
            </h2>

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
              <input
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
              />
              <input
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', borderRadius: '4px' }}
              >
                <option value="">Request Type</option>
                <option value="Return">Return</option>
                <option value="Exchange">Exchange</option>
              </select>
              <input
                placeholder="Desired Size (if exchange)"
                value={desiredSize}
                onChange={(e) => setDesiredSize(e.target.value)}
                style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', boxSizing: 'border-box', borderRadius: '4px' }}
              />
            </div>

            <textarea
              placeholder="Reason for return/exchange"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', backgroundColor: '#1C1917', color: '#F3F1EA', height: '100px', boxSizing: 'border-box', marginBottom: '16px', borderRadius: '4px' }}
            />

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
                borderRadius: '4px'
              }}
            >
              Submit Request
            </button>
          </>
        )}
      </section>

    </div>
  )
}

export default Returns