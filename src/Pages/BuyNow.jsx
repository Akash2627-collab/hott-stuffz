import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function BuyNowPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const item = location.state?.item

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  // If someone lands here directly (no item passed), send them back to shop
  if (!item) {
    return (
      <div style={{ padding: '80px 40px' }}>
        <p style={{ color: '#4A4540' }}>No product selected.</p>
        <button
          onClick={() => navigate('/shop')}
          style={{
            marginTop: '16px',
            backgroundColor: '#A31621',
            color: '#F3F1EA',
            padding: '12px 24px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Back to Shop
        </button>
      </div>
    )
  }

  function getPrice() {
    return parseInt(item.price.replace('₹', ''))
  }

  async function handlePayment() {
    if (!name || !phone || !address) {
      alert('Please fill your name, phone and address first!')
      return
    }

    const options = {
      key: "rzp_test_T8E3mLkTaJ8Tdj",
      amount: getPrice() * 100,
      currency: "INR",
      name: "Hott Stuffz",
      description: item.name,
      handler: async function (response) {
        await addDoc(collection(db, 'orders'), {
          customerName: name,
          customerPhone: phone,
          customerAddress: address,
          items: [item],
          total: getPrice(),
          paymentId: response.razorpay_payment_id,
          status: 'Paid',
          createdAt: new Date().toLocaleDateString()
        })
        alert('Payment Successful! Order placed. Payment ID: ' + response.razorpay_payment_id)
        navigate('/')
      },
      prefill: {
        name: name,
        contact: phone
      },
      theme: {
        color: "#A31621"
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div style={{ padding: '80px 40px' }}>

      <h1 style={{ fontFamily: 'Rye, serif', color: '#161412', marginBottom: '40px' }}>
        Buy Now
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

        {/* Left — Item Summary */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #4A4540'
          }}>
            <div>
              <h3 style={{ color: '#161412', marginBottom: '6px' }}>{item.name}</h3>
              <p style={{ color: '#4A4540', fontSize: '13px' }}>{item.category}</p>
            </div>
            <p style={{ color: '#A31621', fontWeight: '600' }}>{item.price}</p>
          </div>

          <p style={{ fontSize: '18px', fontWeight: '600', color: '#161412', marginTop: '24px' }}>
            Total: ₹{getPrice()}
          </p>
        </div>

        {/* Right — Customer Details */}
        <div>
          <h2 style={{ fontFamily: 'Rye, serif', marginBottom: '24px', fontSize: '20px' }}>
            Delivery Details
          </h2>

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', marginBottom: '16px', boxSizing: 'border-box' }}
          />

          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', marginBottom: '16px', boxSizing: 'border-box' }}
          />

          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', marginBottom: '24px', height: '100px', boxSizing: 'border-box' }}
          />

          <button
            onClick={handlePayment}
            style={{
              width: '100%',
              backgroundColor: '#A31621',
              color: '#F3F1EA',
              fontFamily: 'Work Sans, sans-serif',
              fontSize: '14px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '16px 40px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Proceed to Pay
          </button>
        </div>

      </div>
    </div>
  )
}

export default BuyNowPage