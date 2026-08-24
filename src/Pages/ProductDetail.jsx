import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams, useNavigate } from 'react-router-dom'
import SizeChartModal from '../components/SizeChartModal'

function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [customSize, setCustomSize] = useState('')
  const [showSizeChart, setShowSizeChart] = useState(false)
  const navigate = useNavigate()

  const whatsappPhoneNumber = '919000000000' 

  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() })
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  function getSizeOptions(category) {
    if (category === 'Topwear' || category === 'Complete Outfits') {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    } else if (category === 'Bottomwear') {
      return ['28', '30', '32', '34', '36', '38']
    } else {
      return ['Free Size']
    }
  }

  function getFinalSize() {
    return customSize || selectedSize
  }

  function handleAddToCart() {
    const finalSize = getFinalSize()
    if (!finalSize) {
      alert('Please select your size first!')
      return
    }
    addToCart({ ...product, size: finalSize })
  }

  function handleBuyNow() {
    const finalSize = getFinalSize()
    if (!finalSize) {
      alert('Please select your size first!')
      return
    }
    addToCart({ ...product, size: finalSize })
    navigate('/cart')
  }

  function handleWhatsAppOrder() {
    const finalSize = getFinalSize()
    if (!finalSize) {
      alert('Please select or enter your size!')
      return
    }

    const currentUrl = window.location.href
    const message = `Hi Hott Stuffz! I'd like to order this item:\n\n` +
      `*Product:* ${product.name}\n` +
      `*Category:* ${product.category || 'N/A'}\n` +
      `*Size:* ${finalSize}\n` +
      `*Price:* ${product.price}\n` +
      `*Link:* ${currentUrl}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`, '_blank')
  }

  if (loading) return <p style={{ padding: '80px 40px' }}>Loading...</p>
  if (!product) return <p style={{ padding: '80px 40px' }}>Product not found!</p>

  const sizeOptions = getSizeOptions(product.category)

  return (
    <div style={{ padding: '80px 40px', display: 'flex', gap: '60px' }}>
      <div style={{ flex: 1 }}>
        <img src={product.imageUrl || "https://placehold.co/500x600"} alt={product.name} style={{ width: '100%' }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: '#A31621', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
          {product.category}
        </p>
        <h1 style={{ fontFamily: 'Rye, serif', fontSize: '36px', color: '#161412', marginBottom: '16px' }}>
          {product.name}
        </h1>
        <p style={{ fontSize: '24px', color: '#161412', fontWeight: '600', marginBottom: '24px' }}>
          {product.price}
        </p>
        <p style={{ color: '#4A4540', lineHeight: '1.8', marginBottom: '32px' }}>
          {product.description}
        </p>

        {/* Size Selector */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: '#161412', fontWeight: '600', margin: 0 }}>
              Select Size
            </p>
            <button
              onClick={() => setShowSizeChart(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#A31621',
                fontSize: '12px',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontFamily: 'Work Sans, sans-serif'
              }}
            >
              Size Chart
            </button>
          </div>

          {/* Size buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size)
                  setCustomSize('')
                }}
                style={{
                  padding: '10px 16px',
                  border: selectedSize === size && !customSize ? '2px solid #A31621' : '1px solid #4A4540',
                  backgroundColor: selectedSize === size && !customSize ? '#A31621' : 'transparent',
                  color: selectedSize === size && !customSize ? '#F3F1EA' : '#161412',
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '13px',
                  cursor: 'pointer',
                  minWidth: '48px'
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Manual size input */}
          {product.category !== 'Accessories' && (
            <input
              placeholder="Or type your size manually (e.g. 31, XL, etc.)"
              value={customSize}
              onChange={(e) => {
                setCustomSize(e.target.value)
                setSelectedSize('')
              }}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #4A4540',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          )}

          {/* Show selected size */}
          {getFinalSize() && (
            <p style={{ marginTop: '8px', fontSize: '13px', color: '#4A4540' }}>
              Selected size: <strong style={{ color: '#A31621' }}>{getFinalSize()}</strong>
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#A31621',
            color: '#F3F1EA',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '16px 40px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '12px'
          }}
        >
          Add to Cart
        </button>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          style={{
            backgroundColor: '#161412',
            color: '#F3F1EA',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '16px 40px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '12px'
          }}
        >
          Buy Now
        </button>

      </div>

      {showSizeChart && <SizeChartModal onClose={() => setShowSizeChart(false)} />}
    </div>
  )
}

export default ProductDetail