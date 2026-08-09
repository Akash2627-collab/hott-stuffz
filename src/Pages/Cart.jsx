import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Cart({ cart, removeFromCart }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  function calculateTotal() {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', ''))
      return total + price
    }, 0)
  }

  async function handlePayment() {
    if (!name || !phone || !address) {
      alert('Please fill your name, phone and address first!')
      return
    }

    const options = {
      key: "rzp_test_T8E3mLkTaJ8Tdj",
      amount: calculateTotal() * 100,
      currency: "INR",
      name: "Hott Stuffz",
      description: "Men's Fashion",
      handler: async function (response) {
        await addDoc(collection(db, 'orders'), {
          customerName: name,
          customerPhone: phone,
          customerAddress: address,
          items: cart,
          total: calculateTotal(),
          paymentId: response.razorpay_payment_id,
          status: 'Paid',
          createdAt: new Date().toLocaleDateString()
        })
        alert('Payment Successful! Order placed. Payment ID: ' + response.razorpay_payment_id)
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
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p style={{ color: '#4A4540', fontSize: '16px' }}>
          Your cart is empty. Go add some fits!
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

          {/* Left — Cart Items */}
          <div>
            {cart.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                borderBottom: '1px solid #4A4540'
              }}>
                <div>
  <h3 style={{ color: '#161412', marginBottom: '6px' }}>{item.name}</h3>
  <p style={{ color: '#4A4540', fontSize: '13px' }}>{item.category}</p>
  <p style={{ color: '#A31621', fontSize: '13px', fontWeight: '600' }}>
    Size: {item.size || 'Not selected'}
  </p>
</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <p style={{ color: '#A31621', fontWeight: '600' }}>{item.price}</p>
                  <button
                    onClick={() => removeFromCart(index)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #A31621',
                      color: '#A31621',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <p style={{ fontSize: '18px', fontWeight: '600', color: '#161412', marginTop: '24px' }}>
              Total: ₹{calculateTotal()}
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
      )}

    </div>
  )
}

export default Cart