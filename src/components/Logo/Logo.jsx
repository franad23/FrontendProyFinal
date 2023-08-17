import './logo.css'
import { Link } from 'react-router-dom'

import LogoImg from '../../assets/EchoSurveyLogo.png'

function Logo() {
  return (
    <Link to='/' className='logoMainContainer'>
      <img src={LogoImg} alt="LogoEchoSurvey" className='logoImgEchoSurvey'/>
      <h1 className='titleLogo'>Echosurvey</h1>
    </Link>
  )
}

export default Logo