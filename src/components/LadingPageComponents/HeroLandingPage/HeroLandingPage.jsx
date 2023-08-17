import './herolandingpage.css'
import Otherheroimg from '../../../assets/OtherheroImg.jpg'

function HeroLandingPage() {
  return (
    <div className='heroladingpageMainContainer'>
      <img className='imgHeroLanding' src={Otherheroimg} alt="HeroLanding" />
      <h1 className='sloganHeroLanding'>Explora, Opina, Decide</h1>
    </div>
  )
}

export default HeroLandingPage