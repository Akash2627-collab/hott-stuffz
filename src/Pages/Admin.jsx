import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [occasion, setOccasion] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
    fetchOrders()
    fetchReviews()
  }, [])

  async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, 'products'))
    const productList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setProducts(productList)
    setLoading(false)
  }

  async function fetchOrders() {
    const querySnapshot = await getDocs(collection(db, 'orders'))
    const orderList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setOrders(orderList)
  }

  async function fetchReviews() {
    const querySnapshot = await getDocs(collection(db, 'reviews'))
    const reviewList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setReviews(reviewList)
  }

  async function handleAddProduct() {
    if (!name || !price || !category || !occasion || !description || !imageUrl) {
      alert('Please fill all fields including image URL!')
      return
    }
    await addDoc(collection(db, 'products'), {
      name, price, category, occasion, description, imageUrl
    })
    alert('Product added!')
    setName('')
    setPrice('')
    setCategory('')
    setOccasion('')
    setDescription('')
    setImageUrl('')
    fetchProducts()
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, 'products', id))
    fetchProducts()
  }

  async function handleDeleteReview(id) {
    await deleteDoc(doc(db, 'reviews', id))
    fetchReviews()
  }

  async function handleLogout() {
    await signOut(auth)
    navigate('/admin-login')
  }

  if (loading) return <p style={{ padding: '40px' }}>Loading...</p>

  return (
    <div style={{ padding: '40px', backgroundColor: '#F3F1EA', minHeight: '100vh' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'Rye, serif', color: '#A31621', fontSize: '28px' }}>
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{ padding: '10px 24px', backgroundColor: '#161412', color: '#F3F1EA', border: 'none', cursor: 'pointer', fontFamily: 'Work Sans, sans-serif' }}
        >
          Logout
        </button>
      </div>

      {/* Add Product Form */}
      <div style={{ backgroundColor: '#ffffff', padding: '32px', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', marginBottom: '24px', fontSize: '20px' }}>Add New Product</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)}
            style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif' }} />
          <input placeholder="Price (e.g. ₹599)" value={price} onChange={(e) => setPrice(e.target.value)}
            style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif' }} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif' }}>
            <option value="">Select Category</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Complete Outfits">Complete Outfits</option>
          </select>
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)}
            style={{ padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif' }}>
            <option value="">Select Occasion</option>
            <option value="Casual">Casual</option>
            <option value="Party & Night Out">Party & Night Out</option>
            <option value="Formal">Formal</option>
            <option value="Ethnic & Traditional">Ethnic & Traditional</option>
          </select>
        </div>
        <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', marginTop: '16px', height: '100px', boxSizing: 'border-box' }} />
        <input
          placeholder="Image URL from Cloudinary"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '1px solid #4A4540', fontFamily: 'Work Sans, sans-serif', marginTop: '16px', boxSizing: 'border-box' }}
        />
        {imageUrl && (
          <img src={imageUrl} alt="Preview"
            style={{ width: '120px', height: '150px', objectFit: 'cover', marginTop: '12px', border: '1px solid #4A4540' }} />
        )}
        <button onClick={handleAddProduct}
          style={{ marginTop: '16px', padding: '14px 32px', backgroundColor: '#A31621', color: '#F3F1EA', border: 'none', cursor: 'pointer', fontFamily: 'Work Sans, sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Add Product
        </button>
      </div>

      {/* Products List */}
      <div style={{ backgroundColor: '#ffffff', padding: '32px', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', marginBottom: '24px', fontSize: '20px' }}>All Products ({products.length})</h2>
        {products.map((product) => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F3F1EA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name}
                  style={{ width: '60px', height: '80px', objectFit: 'cover' }} />
              )}
              <div>
                <h3 style={{ color: '#161412', marginBottom: '4px' }}>{product.name}</h3>
                <p style={{ color: '#4A4540', fontSize: '13px' }}>{product.category} — {product.occasion} — {product.price}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(product.id)}
              style={{ padding: '8px 20px', backgroundColor: '#A31621', color: '#F3F1EA', border: 'none', cursor: 'pointer', fontFamily: 'Work Sans, sans-serif' }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <div style={{ backgroundColor: '#ffffff', padding: '32px', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', marginBottom: '24px', fontSize: '20px' }}>
          All Orders ({orders.length})
        </h2>
        {orders.length === 0 ? (
          <p style={{ color: '#4A4540' }}>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={{ padding: '20px', borderBottom: '1px solid #F3F1EA', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ color: '#161412' }}>{order.customerName}</h3>
                <span style={{ color: '#A31621', fontWeight: '600' }}>₹{order.total}</span>
              </div>
              <p style={{ color: '#4A4540', fontSize: '13px', marginBottom: '4px' }}>📞 {order.customerPhone}</p>
              <p style={{ color: '#4A4540', fontSize: '13px', marginBottom: '4px' }}>📍 {order.customerAddress}</p>
              <p style={{ color: '#4A4540', fontSize: '13px', marginBottom: '4px' }}>🕐 {order.createdAt}</p>
              <p style={{ color: '#4A4540', fontSize: '13px', marginBottom: '8px' }}>💳 {order.paymentId}</p>
              <div>
               {order.items.map((item, index) => (
  <span key={index} style={{ display: 'inline-block', backgroundColor: '#F3F1EA', padding: '4px 12px', marginRight: '8px', fontSize: '12px', color: '#161412' }}>
    {item.name} — {item.price} — Size: {item.size || 'Not specified'}
  </span>
))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reviews Section */}
      <div style={{ backgroundColor: '#ffffff', padding: '32px' }}>
        <h2 style={{ fontFamily: 'Rye, serif', marginBottom: '24px', fontSize: '20px' }}>
          Customer Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p style={{ color: '#4A4540' }}>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid #F3F1EA' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {review.photoUrl && (
                  <img src={review.photoUrl} alt={review.name}
                    style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                )}
                <div>
                  <h4 style={{ color: '#161412', marginBottom: '4px' }}>{review.name}</h4>
                  <p style={{ color: '#A31621', fontSize: '14px', marginBottom: '4px' }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </p>
                  <p style={{ color: '#4A4540', fontSize: '13px', marginBottom: '4px' }}>{review.comment}</p>
                  <p style={{ color: '#4A4540', fontSize: '12px' }}>{review.createdAt}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteReview(review.id)}
                style={{ padding: '8px 20px', backgroundColor: '#A31621', color: '#F3F1EA', border: 'none', cursor: 'pointer', fontFamily: 'Work Sans, sans-serif', whiteSpace: 'nowrap' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Admin