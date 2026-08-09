import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import './ProductGrid.css'

function ProductGrid({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProducts() {
      const querySnapshot = await getDocs(collection(db, 'products'))
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProducts(productList)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <p style={{ padding: '40px' }}>Loading products...</p>
  }

  return (
    <section className="product-section">
      <h2 className="section-title">New Arrivals</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="product-image">
              <img src={product.imageUrl || "https://placehold.co/300x350"} alt={product.name} />
            </div>
            <div className="product-info">
              <p className="product-category">{product.category}</p>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  className="product-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="product-btn"
                  style={{ backgroundColor: '#161412' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/buy-now', { state: { item: product } })
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductGrid