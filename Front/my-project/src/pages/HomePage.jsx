import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Menu from './Landing_Page/Menu'
import Layer from './Landing_Page/Layer'
import Layer2 from './Landing_Page/layer2'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Menu />
      <Layer />
      <Layer2 />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default HomePage

