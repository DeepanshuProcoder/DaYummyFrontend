import Navbar from '../components/Navbar'
import '../styles/Home.css'
import '../styles/navbar.css'
import SubNavbar from '../components/SubNavbar'
import Hero from '../components/Hero'
import 'bootstrap/dist/css/bootstrap.css'
import CarouselFoodHero from '../components/CrouselFoodHero'
import Carousel2 from '../components/Crousel2'
import MovingHeadline from '../components/MarqueeHome'

function HomePage() {
  return (
    <div className='outer-container'>
      
       
        <MovingHeadline/>
        <div className="carousel-section">

          <div className="left-box">
            <CarouselFoodHero />
          </div>

          <div className="right-box">
            <Carousel2 delay={1500} />
          </div>

        </div>
      
      <div className='below-container'><Hero /></div>
    </div>
  )
}

export default HomePage;