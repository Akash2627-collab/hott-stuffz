import { useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

function StyleAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [occasion, setOccasion] = useState('')
  const [budget, setBudget] = useState('')
  const [size, setSize] = useState('')
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState(null)

  async function getRecommendations() {
    if (!occasion || !budget || !size) {
      alert('Please fill all fields!')
      return
    }

    setLoading(true)
    setStep(0)

    try {
      const querySnapshot = await getDocs(collection(db, 'products'))
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      const productList = products.map(p =>
        `ID: ${p.id} | Name: ${p.name} | Price: ${p.price} | Category: ${p.category} | Occasion: ${p.occasion}`
      ).join('\n')

      const response = await fetch('/api/style-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          occasion,
          budget,
          size,
          productList
        })
      })

      const data = await response.json()
      console.log('API Response:', data)

      if (!data.content || !data.content[0]) {
        alert('Could not get recommendations. Error: ' + JSON.stringify(data.error))
        setLoading(false)
        setStep(3)
        return
      }

      const text = data.content[0].text
      const parsed = JSON.parse(text)

      const fullProducts = parsed.recommendations.map(rec => {
        const fullProduct = products.find(p => p.id === rec.id)
        return { ...rec, imageUrl: fullProduct?.imageUrl }
      })

      setRecommendations({ ...parsed, recommendations: fullProducts })
      setLoading(false)
      setStep(4)

    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again!')
      setLoading(false)
      setStep(3)
    }
  }

  function reset() {
    setStep(1)
    setOccasion('')
    setBudget('')
    setSize('')
    setRecommendations(null)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#A31621',
          color: '#F3F1EA',
          fontFamily: 'Rye, serif',
          fontSize: '14px',
          padding: '14px 20px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '50px',
          boxShadow: '0 4px 20px rgba(163, 22, 33, 0.4)',
          zIndex: 1000,
          letterSpacing: '1px'
        }}
      >
        🔥 Style Assist
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '24px',
          width: '360px',
          backgroundColor: '#161412',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          zIndex: 1000,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '18px' }}>
              Style Assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#F3F1EA', fontSize: '20px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          {/* Step 1 — Occasion */}
          {step === 1 && (
            <div>
              <p style={{ color: '#F3F1EA', marginBottom: '16px', fontSize: '14px' }}>
                What's the occasion? 👔
              </p>
              {['Casual', 'Party & Night Out', 'Formal', 'Ethnic & Traditional', 'Wedding'].map(occ => (
                <button
                  key={occ}
                  onClick={() => { setOccasion(occ); setStep(2) }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '8px',
                    backgroundColor: 'transparent',
                    border: '1px solid #4A4540',
                    color: '#F3F1EA',
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '4px'
                  }}
                >
                  {occ}
                </button>
              ))}
            </div>
          )}

          {/* Step 2 — Budget */}
          {step === 2 && (
            <div>
              <p style={{ color: '#F3F1EA', marginBottom: '16px', fontSize: '14px' }}>
                What's your budget? 💰
              </p>
              {['500', '1000', '1500', '2000', '3000'].map(b => (
                <button
                  key={b}
                  onClick={() => { setBudget(b); setStep(3) }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '8px',
                    backgroundColor: 'transparent',
                    border: '1px solid #4A4540',
                    color: '#F3F1EA',
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '4px'
                  }}
                >
                  Under ₹{b}
                </button>
              ))}
            </div>
          )}

          {/* Step 3 — Size */}
          {step === 3 && (
            <div>
              <p style={{ color: '#F3F1EA', marginBottom: '16px', fontSize: '14px' }}>
                What's your size? 📏
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: size === s ? '#A31621' : 'transparent',
                      border: size === s ? '2px solid #A31621' : '1px solid #4A4540',
                      color: '#F3F1EA',
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '13px',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <input
                placeholder="Or type your size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #4A4540',
                  backgroundColor: '#1C1917',
                  color: '#F3F1EA',
                  fontFamily: 'Work Sans, sans-serif',
                  boxSizing: 'border-box',
                  marginBottom: '16px'
                }}
              />
              <button
                onClick={getRecommendations}
                disabled={!size}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#A31621',
                  color: '#F3F1EA',
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '14px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Get My Style 🔥
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#A31621', fontFamily: 'Rye, serif', fontSize: '16px' }}>
                Styling you up... 🔥
              </p>
            </div>
          )}

          {/* Step 4 — Recommendations */}
          {step === 4 && recommendations && (
            <div>
              <p style={{ color: '#4A4540', fontSize: '13px', marginBottom: '20px', fontStyle: 'italic' }}>
                "{recommendations.stylistNote}"
              </p>
              {recommendations.recommendations.map((rec, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: '#1C1917',
                  borderRadius: '8px',
                  borderLeft: '3px solid #A31621'
                }}>
                  {rec.imageUrl && (
                    <img
                      src={rec.imageUrl}
                      alt={rec.name}
                      style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  )}
                  <div>
                    <h4 style={{ color: '#F3F1EA', fontSize: '14px', marginBottom: '4px' }}>{rec.name}</h4>
                    <p style={{ color: '#A31621', fontSize: '13px', marginBottom: '4px' }}>{rec.price}</p>
                    <p style={{ color: '#4A4540', fontSize: '12px' }}>{rec.reason}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={reset}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  border: '1px solid #4A4540',
                  color: '#F3F1EA',
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                Start Over
              </button>
            </div>
          )}

        </div>
      )}
    </>
  )
}

export default StyleAssistant