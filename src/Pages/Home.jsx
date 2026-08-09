import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import Reviews from '../components/Reviews'
import DemandSection from '../components/DemandSection'

function Home({ addToCart }) {
  return (
    <div>
      <Hero />
      <ProductGrid addToCart={addToCart} />
      <div style={{ padding: '80px 40px' }}>
        <Reviews productId="homepage" />
      </div>
      <DemandSection />
    </div>
  )
}

export default Home