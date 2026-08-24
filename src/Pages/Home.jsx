import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import Reviews from '../components/Reviews'
import DemandSection from '../components/DemandSection'

function Home() {
  return (
    <div>
      <Hero />
      <DemandSection />
      <ProductGrid />
      <div style={{ padding: '80px 40px' }}>
        <Reviews productId="homepage" />
      </div>
    </div>
  )
}

export default Home