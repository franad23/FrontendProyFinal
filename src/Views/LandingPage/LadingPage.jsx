import './ladingpage.css'

//Components
import NavbarLadingPage from '../../components/LadingPageComponents/NavbarLandingPage.jsx/NavbarLadingPage'
import HeroLandingPage from '../../components/LadingPageComponents/HeroLandingPage/HeroLandingPage'
import InfoSectionsLandingPage from '../../components/LadingPageComponents/InfoSectionsLandingPage/InfoSectionsLandingPage'
import CardsplansSection from '../../components/LadingPageComponents/CardsPlansSections/CardsplansSection'
import FooterLandingPage from '../../components/LadingPageComponents/FooterLandingPage/FooterLandingPage'

function LadingPage() {
  return (
    <div className='landingPageMainContainer'>
      <NavbarLadingPage/>
      <HeroLandingPage/>
      <InfoSectionsLandingPage/>
      <CardsplansSection/>
      <FooterLandingPage/>
    </div>
  )
}

export default LadingPage