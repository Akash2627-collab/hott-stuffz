import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductDetail from './Pages/ProductDetail.jsx'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './Pages/Home.jsx'
import Admin from './Pages/Admin.jsx'
import BuyNow from './Pages/BuyNow.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import Shop from './Pages/Shop.jsx'
import About from './Pages/About.jsx'
import Cart from './Pages/Cart.jsx'

function App() {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart([...cart, product])
  }

  function removeFromCart(index) {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
  }

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/buy-now" element={<BuyNow />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
      </Routes>
      <Footer />
      
    </BrowserRouter>
  )
}

export default App