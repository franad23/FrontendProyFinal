import './infoverifyemail.css'
import { Link } from 'react-router-dom'

//Components
import Logo from '../../components/Logo/Logo'

function InfoVerifyEmail() {
  return (
    <div className='inforVerifyEmailMainContainer'>
      <div className='verifyInfo'>
        <Logo/>
        <h1 className='titleVerifyEmail'>Verifica tu Email y luego inicia sesion!</h1>
        <div className='btnLoginContainerInfoVerify'>
          <Link to='/login' className='btnInfoVerifyEmail'>Iniciar Sesion</Link>
        </div>
      </div>
    </div>
  )
}

export default InfoVerifyEmail