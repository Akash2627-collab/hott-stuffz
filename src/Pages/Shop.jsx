import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

function Shop({ addToCart }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(
    new URLSearchParams(location.search).get('category') || 'All'
  )
  const [selectedOccasion, setSelectedOccasion] = useState('All')
  const [sortPrice, setSortPrice] = useState('Default')

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

  let filtered = [...products]

  if (selectedCategory !== 'All') {
    filtered = filtered.filter(p => p.category === selectedCategory)
  }

  if (selectedOccasion !== 'All') {
    filtered = filtered.filter(p => p.occasion === selectedOccasion)
  }

  if (sortPrice === 'Low to High') {
    filtered = filtered.sort((a, b) =>
      parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''))
    )
  } else if (sortPrice === 'High to Low') {
    filtered = filtered.sort((a, b) =>
      parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', ''))
    )
  }

  if (loading) return <p style={{ padding: '80px 40px' }}>Loading...</p>

  return (
    <div>
      <div style={{ padding: '40px 40px 0px 40px' }}>
        <h1 style={{ fontFamily: 'Rye, serif', marginBottom: '24px' }}>All Products</h1>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '10px 16px', border: '1px solid #161412', fontFamily: 'Work Sans, sans-serif', cursor: 'pointer' }}
          >
            <option value="All">All Categories</option>
            <option value="Complete Outfits">Complete Outfits</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            onChange={(e) => setSelectedOccasion(e.target.value)}
            style={{ padding: '10px 16px', border: '1px solid #161412', fontFamily: 'Work Sans, sans-serif', cursor: 'pointer' }}
          >
            <option value="All">All Occasions</option>
            <option value="Casual">Casual</option>
            <option value="Party & Night Out">Party & Night Out</option>
            <option value="Formal">Formal</option>
            <option value="Ethnic & Traditional">Ethnic & Traditional</option>
          </select>

          <select
            onChange={(e) => setSortPrice(e.target.value)}
            style={{ padding: '10px 16px', border: '1px solid #161412', fontFamily: 'Work Sans, sans-serif', cursor: 'pointer' }}
          >
            <option value="Default">Sort by Price</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>
      </div>

      <div style={{ padding: '40px' }}>
        <div className="product-grid">
          {filtered.map((product) => (
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
                <button
                  className="product-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shop