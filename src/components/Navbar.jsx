import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <span className="logo-kannada">ಹಾಟ್ ಸ್ಟಫ್ಸ್</span>
        <span className="logo-english">HOTT STUFFZ</span>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={menuOpen ? "navbar-links open" : "navbar-links"}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">New Arrivals</Link></li>
        <li className="dropdown">
          Categories
          <ul className="dropdown-menu">
            <li onClick={() => navigate('/shop?category=Complete Outfits')}>Complete Outfits</li>
            <li onClick={() => navigate('/shop?category=Topwear')}>Topwear</li>
            <li onClick={() => navigate('/shop?category=Bottomwear')}>Bottomwear</li>
            <li onClick={() => navigate('/shop?category=Accessories')}>Accessories</li>
          </ul>
        </li>
        <li><Link to="/about">About</Link></li>
        <li className="cart-icon">
          <Link to="/cart">Cart ({cartCount})</Link>
        </li>
      </ul>

    </nav>
  )
}

export default Navbar