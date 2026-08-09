import './Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <h2 className="footer-logo">HOTT STUFFZ</h2>
          <p className="footer-tagline">Ready to wear. Right now.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>New Arrivals</li>
            <li>Categories</li>
            <li>About</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>hottstuffz.hs@gmail.com</p>
          <a href="https://www.instagram.com/hott_stuffz_?igsh=MTd5dnlrcm1hMHEyNg==" target="_blank">Instagram</a>
        </div>

        <div className="footer-founders">
          <h4>The Team</h4>
          <p>Founder: G Akash</p>
          <p>Co-Founder: Sanjay Yogi</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 Hott Stuffz. All rights reserved.</p>
      </div>

    </footer>
  )
}

export default Footer 